//
//  MNTActivityItemSource.swift
//  AIVoice
//
//  Created by VASILI HRYB on 31.01.24.
//

import LinkPresentation

@objc (MNTActivityItemSource)
class MNTActivityItemSource: NSObject, UIActivityItemSource {
  var title: String
  var text: String
  var url: URL?
  var subtitle: String?
  
  @objc init(title: String, text: String, url: URL?, subtitle: String?) {
    self.title = title
    self.text = text
    self.url = url
    self.subtitle = subtitle
    super.init()
  }
  
  @objc func activityViewControllerPlaceholderItem(_ activityViewController: UIActivityViewController) -> Any {
    return text
  }
  
  @objc func activityViewController(_ activityViewController: UIActivityViewController, itemForActivityType activityType: UIActivity.ActivityType?) -> Any? {
    return text
  }
  
  @objc func activityViewController(_ activityViewController: UIActivityViewController, subjectForActivityType activityType: UIActivity.ActivityType?) -> String {
    return title
  }
  
  @objc func activityViewControllerLinkMetadata(_ activityViewController: UIActivityViewController) -> LPLinkMetadata? {
    let metadata = LPLinkMetadata()
    metadata.title = title
    
    if let url = url {
      if let image = UIImage(contentsOfFile: url.relativePath) {
        metadata.iconProvider = NSItemProvider(object: image)
      }
    }
    
    if let subtitle = subtitle {
      metadata.originalURL = URL(fileURLWithPath: subtitle)
    }
        
    return metadata
  }
}
