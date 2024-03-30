//
//  GradientView.swift
//  AIVoice
//
//  Created by VASILI HRYB on 21.08.23.
//

import UIKit

@IBDesignable
class GradientView: UIView {
  @IBInspectable var firstColor: UIColor = #colorLiteral(red: 0.09019607843, green: 0.02352941176, blue: 0.2039215686, alpha: 1) {
    didSet {
      updateView()
    }
  }
  @IBInspectable var secondColor: UIColor = UIColor.black {
    didSet {
      updateView()
    }
  }
  @IBInspectable var isHorizontal: Bool = false {
     didSet {
        updateView()
     }
  }
  
  override class var layerClass: AnyClass {
    get {
      return CAGradientLayer.self
    }
  }

  func updateView() {
   let layer = self.layer as! CAGradientLayer
   layer.colors = [firstColor, secondColor].map{$0.cgColor}
   if (self.isHorizontal) {
      layer.startPoint = CGPoint(x: 0, y: 0.5)
      layer.endPoint = CGPoint (x: 1, y: 0.5)
   } else {
      layer.startPoint = CGPoint(x: 0.5, y: 0)
      layer.endPoint = CGPoint (x: 0.5, y: 1)
   }
  }
}
