import Foundation
import Photos
import ImageIO
import PDFKit
import CoreGraphics
import AVFoundation

enum SANDBOX {
  enum DOCUMENTS: String, CaseIterable {
    case TEMP = "temp"
    case VOICE = "voice"
    case PREVIEW = "preview"
    case ORIGINAL = "original"
    case DOWNLOAD = "download"
    
    func directoryPath() -> URL? {
      return FileManager.default.urls(for: .documentDirectory, in: .userDomainMask).first?.appendingPathComponent(self.rawValue, conformingTo: .directory)
    }
    
    func filePath(fileName: String?) -> URL? {
      return filePath(fileName: fileName, fileId: nil)
    }
    
    func filePath(fileName: String?, fileId: String?) -> URL? {
      guard let fileName = fileName else { return nil
        
      }
  
      var fileURL = self.directoryPath()
      
      if let fileId = fileId {
        fileURL = fileURL?.appendingPathComponent(fileId)
      }
      
      guard let fileURL = fileURL?.appendingPathComponent(fileName) else { return nil }
      
      return URL(fileURLWithPath: fileURL.path)
    }
  }
}

struct IMAGE_SIZE_MIN {
  static let WIDTH: CGFloat = 20
  static let HEIGHT: CGFloat = 20
  static let PREVIEW_WIDTH: CGFloat = 300
  static let PREVIEW_HEIGHT: CGFloat = 300
}

struct FileHelperConstants {
  static let CHUNK_SIZE_LIMIT = 10485760 // 10 * 1024 * 1024 (10MB)
}

@objc class FileHelper: NSObject {
  private static var _currentService: FileHelper?

  @objc static var shared: FileHelper {
    if _currentService == nil {
      _currentService = FileHelper()
    }
    return _currentService!
  }

  static func dispose() {
    _currentService = nil
  }

  func dispose() {
    FileHelper.dispose()
  }

  deinit {
    print("deinit \(self)")
  }

  private var cacheDate: [URL: Date] = [:]
  private var cacheFileName: [URL: String] = [:]

  override init() {
    super.init()
    cleanTempDirectory()
    SANDBOX.DOCUMENTS.allCases.forEach { self.createDefaultDirectory(path: $0) }
  }
  
  private let fileManager = FileManager.default
  
  func cleanTempDirectory() {
    guard let tempDirectortURL = SANDBOX.DOCUMENTS.TEMP.directoryPath() else {
      return
    }
    do {
      try fileManager.removeItem(at: tempDirectortURL)
    } catch let error {
      print(error.localizedDescription)
    }
  }
  
  @objc func getDocumentOriginalDirectoryPath() -> URL? {
    return SANDBOX.DOCUMENTS.ORIGINAL.directoryPath()
  }
  
  @objc func getDocumentTempDirectoryPath() -> URL? {
    return SANDBOX.DOCUMENTS.TEMP.directoryPath()
  }
  
  @objc func getDocumentVoiceDirectoryPath() -> URL? {
    return SANDBOX.DOCUMENTS.VOICE.directoryPath()
  }

  @objc static var randomFileId: String {
    return String.randomString(length: 17)
  }
  
  func createDefaultDirectory(path: SANDBOX.DOCUMENTS) {
    guard let url = path.directoryPath() else {
      return
    }
    
    do {
      try fileManager.createDirectory(at: url, withIntermediateDirectories: true, attributes: nil)
    } catch let error {
      print(error.localizedDescription)
    }
  }
  
  func createDirectory(path: SANDBOX.DOCUMENTS, directoryName: String) -> URL? {
    guard let url = path.directoryPath()?.appendingPathComponent(directoryName) else {
      return nil
    }
    
    do {
      try fileManager.createDirectory(at: url, withIntermediateDirectories: true, attributes: nil)
      return url
    } catch let error {
      print(error.localizedDescription)
    }
    
    return nil
  }
  
  @objc func copyItem(at path: URL?, to destinationPath: URL?) -> URL? {
    guard let path = path, let destinationPath = destinationPath else {
      return nil
    }
    
    do {
      try fileManager.copyItem(atPath: path.relativePath, toPath: destinationPath.relativePath)
      return destinationPath
    } catch let error {
      print(error.localizedDescription)
    }
    
    return nil
  }
  
  @objc func moveItem(at path: URL?, to destinationPath: URL?) -> URL? {
    guard let path = path, let destinationPath = destinationPath else {
      return nil
    }
    
    do {
      if fileManager.fileExists(atPath: destinationPath.path),
          let newDestinationPath = self.createUniquePath(path: destinationPath)
      {
        try fileManager.moveItem(atPath: path.path, toPath: newDestinationPath.path)
        return newDestinationPath
      } else {
        try fileManager.moveItem(atPath: path.path, toPath: destinationPath.path)
        return destinationPath
      }
    } catch let error {
      print(error.localizedDescription)
    }
    
    return nil
  }
  
  func copyItemWithUniquePath(at path: URL?, to destinationPath: URL?) -> URL? {
    let newDestinationPath = self.createUniquePath(path: destinationPath)
    return self.copyItem(at: path, to: newDestinationPath)
  }
  
  func createFile(path: SANDBOX.DOCUMENTS, name: String?, data: Data?) -> URL? {
    guard let name = name, let data = data, let url = path.directoryPath()?.appendingPathComponent(name) else {
      return nil
    }
    
    self.createDefaultDirectory(path: path)
    
    do {
      try data.write(to: url)
      return url
    } catch let error {
      print(error.localizedDescription)
    }
    
    return nil
  }
  
  func overrideFile(url: URL?, file: Data?) -> Bool {
    guard let url = url, let file = file else {
      return false
    }
    
    do {
      if fileManager.fileExists(atPath: url.path) {
        try fileManager.removeItem(at: url)
        try file.write(to: url)
      } else {
        try file.write(to: url)
      }
      
      return true
    } catch let error {
      print(error.localizedDescription)
    }
    
    return false
  }
  
  @objc func writeFileData(url: URL?, fileData: Data?) -> URL? {
    guard let url = url, let fileData = fileData else {
      return nil
    }
    
    do {
      if fileManager.fileExists(atPath: url.path),
          let newDestinationPath = self.createUniquePath(path: url)
      {
        try fileData.write(to: newDestinationPath)
        return newDestinationPath
      } else {
        try fileData.write(to: url)
        return url
      }
    } catch let error {
      print(error.localizedDescription)
    }
    
    return nil
  }
  
  func deleteFile(path: SANDBOX.DOCUMENTS, name: String?)  {
    guard let name = name, !name.isEmpty, let url = path.directoryPath()?.appendingPathComponent(name) else {
      return
    }
    
    do {
      try fileManager.removeItem(at: url)
    } catch let error {
      print(error.localizedDescription)
    }
  }
}

extension FileHelper {
  @objc func createUniquePath(path destinationPath: URL?) -> URL? {
    guard let destinationPath = destinationPath else {
      return nil
    }
    
    var index = 1
    var newDestinationPath = destinationPath
    
    while self.fileManager.fileExists(atPath: newDestinationPath.path) {
      newDestinationPath = destinationPath
      
      let ext = newDestinationPath.pathExtension
      let name = newDestinationPath.lastPathComponent
        .replacingOccurrences(of: " ", with: "-")
        .replacingOccurrences(of: ".\(ext)", with: "-\(index).\(ext)")
      newDestinationPath = newDestinationPath.deletingLastPathComponent()
      newDestinationPath = newDestinationPath.appendingPathComponent(name)
      index += 1
    }
    
    return newDestinationPath
  }
  
  func saveImage(_ imageData: Data, path: SANDBOX.DOCUMENTS, name: String, size: CGSize?, compression: CGFloat = 1.0) -> URL? {
    guard let image = UIImage(data: imageData) else {
      return nil
    }
    
    return  self.saveImage(image,
                           path: path,
                           name: name,
                           size: size,
                           compression: compression)
  }
  
  func saveImage(_ image: UIImage, path: SANDBOX.DOCUMENTS, name: String, size: CGSize?, compression: CGFloat = 1.0) -> URL? {
    let resizedImage = self.resizeImage(image, size: size ?? image.size)
    return self.createFile(path: path,
                           name: name,
                           data: resizedImage.jpegData(compressionQuality: compression))
  }
  
  func saveImage(_ image: UIImage, url: URL, size: CGSize? = nil, compression: CGFloat = 1.0) -> URL? {
    let resizedImage = self.resizeImage(image, size: size ?? image.size)
    let isOverride = self.overrideFile(url: url, file: resizedImage.jpegData(compressionQuality: compression))
    
    if isOverride {
      return url
    } else {
      return nil
    }
  }
}

extension FileHelper {
  func resizeImage(_ image: UIImage, size targetSize: CGSize) -> UIImage {
    let size = image.size
    
    let widthRatio  = targetSize.width  / size.width
    let heightRatio = targetSize.height / size.height
    
    var newSize: CGSize
    
    if(widthRatio > heightRatio) {
      newSize = CGSize(width: size.width * heightRatio, height: size.height * heightRatio)
    } else {
      newSize = CGSize(width: size.width * widthRatio,  height: size.height * widthRatio)
    }
    
    let rect = CGRect(x: 0, y: 0, width: newSize.width, height: newSize.height)
    
    UIGraphicsBeginImageContextWithOptions(newSize, false, 1.0)
    image.draw(in: rect)
    let newImage = UIGraphicsGetImageFromCurrentImageContext()
    UIGraphicsEndImageContext()
    
    return newImage ?? UIImage()
  }
  
  func resizeImage(url: URL, size: CGSize) -> UIImage {
    guard let data = try? Data(contentsOf: url), let image = UIImage(data: data) else { return UIImage() }
    return self.resizeImage(image, size: size)
  }
  
  func imageSizeFromURL(_ url: URL) -> CGSize? {
    if let source = CGImageSourceCreateWithURL(url as CFURL, nil) {
      if let imageHeader = CGImageSourceCopyPropertiesAtIndex(source, 0, nil) as? [String: AnyObject] {
        if let width = imageHeader["PixelWidth"] as? CGFloat, let height = imageHeader["PixelHeight"] as? CGFloat {
          if let orientation = imageHeader["Orientation"] as? Int {
            if orientation > 4 {
              return CGSize(width: height, height: width)
            } else {
              return CGSize(width: width, height: height)
            }
          } else {
            return CGSize(width: width, height: height)
          }
        }
      }
    }
    return nil
  }
  
  func fileInfoFromURL(_ url: URL) -> [FileAttributeKey : Any]? {
    do {
      return try FileManager.default.attributesOfItem(atPath: url.path)
    } catch let error as NSError {
      print("FileAttribute error: \(error)")
    }
    return nil
  }
  
  func fileSize(_ url: URL) -> Int {
    let info = self.fileInfoFromURL(url)
    return info?[.size] as? Int ?? 0
  }
  
  func createUniqueName(_ name: String?, sameNames: [String]?, isHaveExtension: Bool = true) -> String? {
    guard let name = name, let sameNames = sameNames else {
      return nil
    }
    
    var ext: String? = nil;
    var nameWithoutExt: String = name
    
    if isHaveExtension {
      ext = name.components(separatedBy: ".").last.value
      nameWithoutExt = name.replacingOccurrences(of: ".\(ext.value)", with: "")
    }
    
    if sameNames.count > 0 {
      let indexes = sameNames.compactMap { name -> Int? in
        if let range = name.range(of: "( \\([0-9]+\\))", options: .regularExpression) {
          if let index = Int(name[range].components(separatedBy: CharacterSet.decimalDigits.inverted).joined()) {
            return index
          }
        }
        return nil
      }.sorted()
      
      if indexes.count > 0 {
        let index = indexes.reduce(2) { (result, number) -> Int in
          if result != number {
            return result
          }
          return number + 1
        }
        
        if isHaveExtension {
          return "\(nameWithoutExt) (\(index)).\(ext.value)"
        } else {
          return "\(nameWithoutExt) (\(index))"
        }
      } else {
        if isHaveExtension {
          return "\(nameWithoutExt) (2).\(ext.value)"
        } else {
          return "\(nameWithoutExt) (2)"
        }
      }
    }
    
    return name
  }
  
  private func findDate(url: URL, createDate: inout Date?, mediaType: PHAssetMediaType, ascending: Bool) {
    let originalName = (url.lastPathComponent as NSString).deletingPathExtension

    let fetchOptions = PHFetchOptions()
    fetchOptions.sortDescriptors = [NSSortDescriptor(key: "creationDate", ascending: false)]

    let fetchResult = PHAsset.fetchAssets(with: mediaType, options: fetchOptions)


    loop: for i in 0..<min(100, fetchResult.count) {
      autoreleasepool { () -> Void in
        let asset = fetchResult[i]

        if let resource = PHAssetResource.assetResources(for: asset).last,
           originalName == (resource.originalFilename as NSString).deletingPathExtension
            || resource.debugDescription.contains(originalName)
        {

          createDate = asset.creationDate
        }
      }

      if createDate != nil {
        break loop
      }
    }
  }
  
  func findOriginalName(_ url: URL?, mediaType: PHAssetMediaType, completeClosure: @escaping (String?)->Void) {
    DispatchQueue.global(qos: .utility).async {
      var createDate: Date? = nil
      var newFileName: String? = nil
      
      guard let url = url else {
        DispatchQueue.main.async {
          completeClosure(newFileName)
        }
        return
      }
      
      if let name = self.cacheFileName[url] {
        DispatchQueue.main.async {
          completeClosure(name)
        }
        return
      }
      
      self.findDate(url: url, createDate: &createDate, mediaType: mediaType, ascending: false)
      
      if createDate == nil {
        let currentFileName: NSString = (url.absoluteString.removingPercentEncoding.value as NSString).lastPathComponent as NSString
        
        if currentFileName.isGalleryName() {
          if mediaType == .image {
            newFileName = currentFileName.changeImageName()
          } else {
            newFileName = currentFileName.changeVideoName()
          }
        } else {
          if mediaType == .image {
            if currentFileName.isPatternName() {
              newFileName = currentFileName.normalizeExtensionForImage()
            } else {
              newFileName = "Photo \(currentFileName.normalizeExtensionForImage())"
            }
          } else {
            if currentFileName.isPatternName() {
              newFileName = currentFileName.normalizeExtensionForVideo()
            } else {
              newFileName = "Video \(currentFileName.normalizeExtensionForVideo())"
            }
          }
        }
      } else {
        newFileName = NSString.changeName(with: url, with: (mediaType == .image ? PHOTO : VIDEO), with: createDate)
      }
      
      DispatchQueue.main.async {
        self.cacheFileName[url] = newFileName
        completeClosure(newFileName)
      }
    }
    
    
    func findOriginalMedia(_ url: URL?, mediaType: PHAssetMediaType, completeClosure: @escaping (PHAsset?)->Void) {
      guard let url = url else {
        return
      }
      
      let fetchOptions = PHFetchOptions()
      fetchOptions.sortDescriptors = [NSSortDescriptor(key: "creationDate", ascending: false)]
      
      let fetchResult = PHAsset.fetchAssets(with: mediaType, options: fetchOptions)
      fetchResult.enumerateObjects { (asset, index, ref) in
        autoreleasepool { () -> Void in
          let options: PHContentEditingInputRequestOptions = PHContentEditingInputRequestOptions()
          options.canHandleAdjustmentData = {(adjustmeta: PHAdjustmentData) -> Bool in
            return true
          }
          
          if let resource = PHAssetResource.assetResources(for: asset).last, (url.lastPathComponent as NSString).deletingPathExtension == (resource.originalFilename as NSString).deletingPathExtension {
            completeClosure(asset)
          }
        }
      }
    }
    
    func isPreviewable(ext: String?, url: URL?) -> Bool {
      guard let ext = ext, let url = url else {
        return false
      }
      
      let fileType = FileTypeCheker.getFileType(fileExtension: ext)
      
      switch fileType {
      case .IMAGE:
        let fileSize = FileHelper.shared.fileSize(url)
        let isFileSmall = fileSize < FileHelperConstants.CHUNK_SIZE_LIMIT
        
        if isFileSmall, let size = FileHelper.shared.imageSizeFromURL(url) {
          return !(size.width < IMAGE_SIZE_MIN.WIDTH || size.height < IMAGE_SIZE_MIN.HEIGHT)
        }
        break
      case .VIDEO, .PDF:
        return true
        
      default:
        return false
      }
      
      return false
    }
    
    func imageDimension(size: CGSize) -> CGSize {
      if size.width < IMAGE_SIZE_MIN.PREVIEW_WIDTH && size.height < IMAGE_SIZE_MIN.PREVIEW_HEIGHT {
        return CGSize(width: size.width, height: size.height)
      }
      
      let index = size.width > size.height
      ? size.width / IMAGE_SIZE_MIN.PREVIEW_WIDTH
      : size.height / IMAGE_SIZE_MIN.PREVIEW_HEIGHT
      
      return CGSize(width: (size.width / index).rounded(), height: (size.height / index).rounded())
    }
    
    func imageFileSize(path: URL?) -> Double {
      guard let path = path else {
        return 0
      }
      
      do {
        let attributes = try fileManager.attributesOfItem(atPath: path.path)
        if let size = attributes[FileAttributeKey.size] as? Double {
          return size
        }
      } catch let error {
        print(error.localizedDescription)
      }
      
      return 0
    }
    
    func compressVideo(inputURL: URL,
                             outputURL: URL,
                             handler:@escaping (_ exportSession: AVAssetExportSession?) -> Void) {
      let urlAsset = AVURLAsset(url: inputURL, options: nil)
      guard let exportSession = AVAssetExportSession(asset: urlAsset,
                                                     presetName: AVAssetExportPreset960x540) else {
        handler(nil)
        
        return
      }
      
      exportSession.outputURL = outputURL
      exportSession.outputFileType = .mp4
      exportSession.exportAsynchronously {
        handler(exportSession)
      }
    }
  }
}
