import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import { SecuredStorage, SecuredStorageKey } from '@/services/securedStorage/securedStorage';

const PRESIGNED_URL_EXPIRATION_SECONDS = 3600;

const R2_SUFFIX = 'r2.cloudflarestorage.com';

function normalizeR2Endpoint(endpoint: string) {
  const url = new URL(endpoint);
  const labels = url.host.split('.');

  if (labels.slice(-3).join('.') === R2_SUFFIX && labels.length > 4) {
    url.host = labels.slice(-4).join('.');
    url.pathname = '/';
  }

  return url.toString().replace(/\/$/, '');
}

async function createS3Client(): Promise<S3Client> {
  const [accessKeyId, secretAccessKey, endpoint] = await Promise.all([
    SecuredStorage.getItem(SecuredStorageKey.awsAccountId),
    SecuredStorage.getItem(SecuredStorageKey.awsSecretKey),
    SecuredStorage.getItem(SecuredStorageKey.awsConnectionString),
  ]);

  if (!accessKeyId || !secretAccessKey || !endpoint) {
    throw new Error('getPresignedFileURL: Missing AWS credentials in SecuredStorage');
  }

  return new S3Client({
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
    endpoint: normalizeR2Endpoint(endpoint),
    region: 'auto',
  });
}

function parseBucketAndKey(url: string, endpoint: string): { bucket: string; key: string } {
  const parsedUrl = new URL(url);
  const endpointHost = new URL(endpoint).host;
  const pathParts = parsedUrl.pathname.split('/').filter(Boolean);

  let bucket = '';
  let key = '';

  if (parsedUrl.host === endpointHost) {
    bucket = pathParts[0] ?? '';
    key = pathParts.slice(1).join('/');
  } else if (parsedUrl.host.endsWith(`.${endpointHost}`)) {
    bucket = parsedUrl.host.slice(0, -(endpointHost.length + 1));
    key = pathParts.join('/');
  } else {
    bucket = pathParts[0] ?? '';
    key = pathParts.slice(1).join('/');
  }

  if (!bucket || !key) {
    throw new Error(`getPresignedFileURL: Unable to parse bucket and key from URL: ${url}`);
  }

  return { bucket, key };
}

export async function getPresignedFileURL(url: string): Promise<string> {
  try {
    const [endpoint, s3Client] = await Promise.all([
      SecuredStorage.getItem(SecuredStorageKey.awsConnectionString),
      createS3Client(),
    ]);

    if (!endpoint) {
      throw new Error('getPresignedFileURL: Missing AWS endpoint in SecuredStorage');
    }

    const { bucket, key } = parseBucketAndKey(url, endpoint);

    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: key,
    });

    const presignedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: PRESIGNED_URL_EXPIRATION_SECONDS,
    });
    return presignedUrl;
  } catch (error) {
    console.error(error);
    return url;
  }
}
