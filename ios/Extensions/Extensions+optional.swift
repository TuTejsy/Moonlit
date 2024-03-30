//
//  Extensions+optional.swift
//  AIVoice
//
//  Created by VASILI HRYB on 8.04.23.
//


import Foundation
import UIKit

extension Optional where Wrapped == String {
  var value: String {
    return self ?? ""
  }
}

extension Optional where Wrapped == Int {
  var value: Int {
    return self ?? 0
  }
}

extension Optional where Wrapped == Double {
  var value: Double {
    return self ?? 0
  }
}

extension Optional where Wrapped == Bool {
  var value: Bool {
    return self ?? false
  }
}

extension Optional where Wrapped == Data {
  var value: Data {
    return self ?? Data()
  }
}

extension Optional where Wrapped == Date {
  var value: Date {
    return self ?? Date()
  }
}

extension Optional where Wrapped == UIImage {
  var value: UIImage {
    return self ?? UIImage()
  }
}

