//
//  FileTypeChecker.swift
//  AIVoice
//
//  Created by VASILI HRYB on 8.04.23.
//

import Foundation

enum FileTypeCheker: String {
  case WEB = "web"
  case PDF = "pdf"
  case EXE = "exe"
  case ZIP = "zip"
  case WORD = "word"
  case FILE = "file"
  case FONT = "font"
  case IMAGE = "image"
  case VIDEO = "video"
  case AUDIO = "audio"
  case EXCEL = "excel"
  case DISK_IMAGE = "diskImage"
  case PRESENTATION = "presentation"
  
  static func getFileType(fileExtension: String) -> FileTypeCheker {
    let lowercaseFileExtension = fileExtension.lowercased()
    
    switch true {
    case WebExtension.contains(lowercaseFileExtension):
      return .WEB
    case PdfExtension.contains(lowercaseFileExtension):
      return .PDF
    case ExecutableExtension.contains(lowercaseFileExtension):
      return .EXE
    case CompressedExtension.contains(lowercaseFileExtension):
      return .ZIP
    case WorldExtension.contains(lowercaseFileExtension):
      return .WORD
    case FontExtension.contains(lowercaseFileExtension):
      return .FONT
    case ImageExtension.contains(lowercaseFileExtension):
      return .IMAGE
    case VideoExtension.contains(lowercaseFileExtension):
      return .VIDEO
    case AudioExtension.contains(lowercaseFileExtension):
      return .AUDIO
    case ExcelExtension.contains(lowercaseFileExtension):
      return .EXCEL
    case DiskImageExtension.contains(lowercaseFileExtension):
      return .DISK_IMAGE
    case PresentationExtension.contains(lowercaseFileExtension):
      return .PRESENTATION
    default:
      return .FILE
    }
  }
  
  static func getIcon(fileExtension: String) -> UIImage {
    let type = FileTypeCheker.getFileType(fileExtension: fileExtension)
    switch type {
    case .WORD:
      return #imageLiteral(resourceName: "word")
    case .EXCEL:
      return #imageLiteral(resourceName: "excel")
    case .PDF:
      return #imageLiteral(resourceName: "pdf")
    case .PRESENTATION:
      return #imageLiteral(resourceName: "presentation")
    case .FONT:
      return #imageLiteral(resourceName: "font")
    case .WEB:
      return #imageLiteral(resourceName: "web")
    case .EXE:
      return #imageLiteral(resourceName: "exe")
    case .AUDIO:
      return #imageLiteral(resourceName: "audio")
    case .VIDEO:
      return #imageLiteral(resourceName: "video")
    case .IMAGE:
      return #imageLiteral(resourceName: "image")
    case .DISK_IMAGE:
      return #imageLiteral(resourceName: "diskImage")
    case .ZIP:
      return #imageLiteral(resourceName: "zip")
    default:
      return #imageLiteral(resourceName: "file")
    }
  }
  
  static var WebExtension: [String] {
    return ["pl","js","py","jsp","css","asp","cer","cfm","cgi","rss","php","htm","html","part","aspx","xhtml"]
  }
  
  static var FontExtension: [String] {
    return ["fnt","fon","otf","ttf"]
  }
  
  static var ExecutableExtension: [String] {
    return ["pl","py","wsf","com","exe","cgi","apk","bat","jar","gadget"]
  }
  
  static var DiskImageExtension: [String] {
    return ["bin","iso","dmg","vcd","toast"]
  }
  
  static var CompressedExtension: [String] {
    return ["z","7z","arj","deb","pkg","rar","rpm","zip","zipx","tar.gz"]
  }
  
  static var PdfExtension: [String] {
    return ["pdf"]
  }
  
  static var WorldExtension: [String] {
    return ["doc","dot","wbk","docx","docm","dotx","dotm","docb"]
  }
  
  static var TextExtension: [String] {
    return ["odt","rtf","tex","txt","wks","wps","wpd"]
  }
  
  static var ExcelExtension: [String] {
    return ["xls","xlt","xlm","xlsx","xlsm","xltx","xltm","ods","xla","xll","xlw","xlsb","xlam"]
  }
  
  static var PresentationExtension: [String] {
    return ["key","odp"]
  }
  
  static var PowerPointExtension: [String] {
    return ["ppt","pot","pps","pptx","pptm","potx","potm","ppam","ppsx","ppsm","sldx","sldm"]
  }
  
  static var AudioExtension: [String] {
    return ["it","xm","ym","aa","au","ra","wv","la","mid","gym","imf","mt2","mng","mod","nsf","nif","org","psf","ptb","s3m","spc","stf","syn","vgm","pxd","tak","shn","rka","ofr","m4a","m4r","pac","ogg","aac","ac3","aif","adx","ahx","ape","asf","aud","dmf","dts","dxd","mmf","mp1","mp2","mp3","mp4", "mpga", "mpc","tta","voc","vox","vqf","wav","wma","aiff","flac","opus","musicxm"]
  }
  
  static var ImageExtension: [String] {
    return ["gif","bmp","png","ppm","pgm","pbm","pnm","bat","bpg","jpg","hdr","exif","tiff","webp","heic","heif","jpeg","jfif","jpeg 2000","sg","drw","ecw","ico","img","pam","pcx","pgf","sid","sun","tga","xisf","deep","fits","flif","ilbm","nrrd","plbm","vicar","layered","ps","cd5","cpt","psd","psp","xcf","pdn","afphoto","cgm","svg","ai","cdr","gem","odg","qcc","vml","xar","xps","hpgl","hvif","!draw","mathm","regis","remote","naplps","pstricks","afdesign","drawingm","graphics","precision","jt","hsf","ipa","ply","prc","skp","xgl","xvl","x3d",".3d","3df","amf",".ma",".mb","pov","stl","u3d",".dgn",".dwf",".dwg",".dxf","step","xaml","iges",".obj",".flt","imml","vrml",".3ds",".3dm","fvrml","3dxml","xvrml",".blend","collada","opengex","edrawings","asymptote","pns","mpo","jps","dng","ciff"]
  }
  
  static var VideoExtension: [String] {
    return ["dv","264","3g2","3gp","3mm","3p2","60d","787","890","aaf","aec","aep","aet","ajp","ale","am","amc","amv","amx","anx","aqt","arf","asf","asx","av","av3","avb","avc","avd","ave","avi","avm","avp","avr","avs","avv","axm","axv","bdm","bik","bix","bk2","blz","bmc","bmk","bnp","box","bs4","bsf","bu","bvr","byu","ced","cel","cip","clk","cme","cmv","cpi","cst","cvc","cx3","d2v","d3v","dad","dav","db2","dce","dck","dcr","dif","dir","dlx","dmb","dmx","dnc","dpa","dpg","dsy","dv4","dvr","dvx","dxr","dzm","dzp","dzt","edl","evo","exo","exp","eye","ezt","f4f","f4m","f4p","f4v","fbr","fbz","fcp","ffd","ffm","flc","flh","fli","flv","flx","ftc","fvt","g2m","g64","gcs","gfp","gl","gom","gts","gvi","gvp","gxf","hdv","hkm","ifo","inp","int","irf","ism","iva","ivf","ivr","ivs","izz","jdr","jmv","jnr","jss","jts","jtv","k3g","kmv","ktn","lrv","lsf","lsx","m15","m1v","m21","m2a","m2p","m2t","m2v","m4e","m4u","m4v","m75","mgv","mj2","mjp","mkv","mmv","mnv","mob","mod","moi","mov","mp4","mp4v","mp4.infovid","mpe","mpf","mpg","mpl","mpv","mqv","mse","msh","mts","mtv","mvb","mvc","mvd","mve","mvp","mvy","mxf","mxv","mys","n3r","nfv","nsv","ntp","nut","nuv","nvc","ogm","ogv","ogx","orv","osp","pac","par","pds","pgi","piv","pjs","pmf","pmv","ppj","pro","psb","psh","psv","pva","pvr","pxv","pz","qt","qtl","qtm","qtz","r3d","rcd","rdb","rec","rm","rmd","rmp","rms","rmv","roq","rp","rsx","rts","rum","rv","rvl","san","sbk","sbt","sbz","scc","scm","scn","sdv","sec","seq","ser","sfd","siv","smi","smk","sml","smv","spl","sqz","srt","ssf","ssm","stl","str","stx","svi","swf","swi","swt","tdt","tdx","thp","tid","tix","tod","tp","tp0","tpd","tpr","trp","ts","tsp","tsv","tvs","usf","usm","vbc","vc1","vcr","vcv","vdo","vdr","vdx","veg","vem","vep","vf","vft","vfw","vfz","vgz","vid","viv","vix","vob","vp3","vp6","vp7","vpj","vr","vro","vs4","vse","vsh","vsp","vtt","w32","wcp","wgi","wm","wmd","wmv","wmx","wot","wp3","wpl","wtv","wvm","wvx","wxp","xej","xel","xfl","xml","xmv","y4m","yog","yuv","zeg","zm1","zm2","zm3","zmv","3gp2","3gpp","3gpp2","aecap","aegraphic","aepx","aetx","anim","arcut","avchd","awlive","bdmv","bdt2","bdt3","bik2","camproj","camrec","camv","cine","clpi","cmmp","cmmtpl","cmproj","cmrec","cpvc","crec","dash","ddat","divx","dmsd","dmsd3d","dmsm","dmsm3d","dmss","dream","dvdmedia","eyetv","fcarch","fcproject","flic","fpdx","g64x","gifv","grasp","h264","hdmov","hevc","imoviemobile","imovieproj","insv","ircp","ismc","ismclip","ismv","izzy","kdenlive","lrec","lvix","m1pg","m2ts","mani","meta","mjpeg","mjpg","mk3d","modd","moff","moov","movie","mp21","mp2v","mpeg","mpeg1","mpeg2","mpeg4","mpg2","mpg4","mpgindex","mpls","mproj","mpsub","mpv2","msdvd","mswmm","mt2s","mvex","ncor","otrkey","photoshow","playlist","plproj","prel","pro4dvd","pro5dvd","proqc","prproj","prtl","pssd","qtch","qtindex","ravi","rcproject","rcrec","rcut","rmvb","rvid","screenflow","sedprj","sfera","sfvidcap","smil","snagproj","tda3mt","theater","tivo","trec","ttxt","tvlayer","tvrecording","tvshow","v264","vcpf","video","viewlet","vivo","vlab","vmlf","vmlt","webm","wfsp","wlmp","wmmp","wsve","xesc","xlmv","xvid","imovielibrary","imovieproject"]
  }
}

@objc class ZRKFileTypeChecker: NSObject {
  @objc func getFileType(fileExtension: String) -> String {
    return FileTypeCheker.getFileType(fileExtension: fileExtension).rawValue
  }
  
  @objc static func isImage(fileExtension: String) -> Bool {
    return FileTypeCheker.getFileType(fileExtension: fileExtension) == .IMAGE
  }
  
  @objc static func isVideo (fileExtension: String) -> Bool {
    return FileTypeCheker.getFileType(fileExtension: fileExtension) == .VIDEO
  }
}

