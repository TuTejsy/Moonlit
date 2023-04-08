import Foundation
import MobileCoreServices

extension String {
  var toInt: Int {
    return Int(self) ?? 0
  }
  
  var mimeTypeExtension: String? {
    let mimeType = self
    
    if let mimeUTI = UTTypeCreatePreferredIdentifierForTag(kUTTagClassMIMEType, mimeType as NSString, nil)?.takeRetainedValue() {
      if let mimetypeExtension = UTTypeCopyPreferredTagWithClass(mimeUTI, kUTTagClassFilenameExtension)?.takeRetainedValue() {
        return mimetypeExtension as String
      }
    }
    
    return nil
  }
  
  func fileName() -> String {
    return URL(fileURLWithPath: self).deletingPathExtension().lastPathComponent
  }
  
  var normalizeString: String? {
    return self.normalize(trim: .whitespacesAndNewlines, pattern: "/[\\u0300-\\u036f]|\'/g")?.lowercased()
  }
  
  func normalize(trim: CharacterSet?, pattern: String?, replaceWith: String = "") -> String? {
    var normalizeString: String? = self.folding(options: .diacriticInsensitive, locale: .current)
    
    if let trim = trim {
      normalizeString = normalizeString?.trimmingCharacters(in: trim)
    }
    if let pattern = pattern {
      normalizeString = normalizeString?.removingRegexMatches(pattern: pattern, replaceWith: replaceWith)
    }
    
    return normalizeString
  }
  
  func isMatch(_ regExp: String) -> Bool {
      return self.range(of: regExp, options: .regularExpression)?.isEmpty ?? true
  }
 
  func matches(in text: String, range: Int? = nil, lastResult: Bool = false) -> [String] {
    do {
      let regex = try NSRegularExpression(pattern: self)
      let results = regex.matches(in: text,
                                  range: NSRange(text.startIndex..., in: text))
      if lastResult, let lastRange = results.last {
        return [String(text[Range(lastRange.range(at: range ?? lastRange.numberOfRanges - 1), in: text)!])]
      } else {
        return results.map {
          String(text[Range($0.range(at: range ?? results.count), in: text)!])
        }
      }
    } catch {
      return []
    }
  }
  
  var sortingString: String? {
    return self.generateSortingStringFrom(string: self)
  }
  
  func generateSortingStringFrom(string: String?) -> String? {
    guard let string = string else {
      return nil
    }
    
    let stringToProcess = string.lowercased();
    
    let maxAllowedNumberLength = 7
    var sortingString: String = ""
    
    var numberString = ""
    
    for character in stringToProcess {
      if let number = Int(String(character)) {
        numberString += String(number)
      } else {
        if numberString.count > 0 {
          var delta = (maxAllowedNumberLength - numberString.count)
          if delta < 0 {
            delta = 0
          }
          
          sortingString += String(repeating: "0", count: delta)
          sortingString += numberString
          numberString = ""
        }
        
        if (character != "(" && character != ")") {
          sortingString += String(character)
        }
      }
    }
    
    if numberString.count > 0 {
      var delta = (maxAllowedNumberLength - numberString.count)
      if delta < 0 {
        delta = 0
      }
      
      sortingString += String(repeating: "0", count: delta)
      sortingString += numberString
    }
    
    return sortingString
  }
  
  func removingRegexMatches(pattern: String, replaceWith: String) -> String? {
    do {
      let regex = try NSRegularExpression(pattern: pattern, options: NSRegularExpression.Options.caseInsensitive)
      let range = NSMakeRange(0, self.count)
      return regex.stringByReplacingMatches(in: self, options: [], range: range, withTemplate: replaceWith)
    } catch let error {
      print(error.localizedDescription)
    }
    
    return nil
  }
  
  var fileExtension: String? {
    let fileURL = URL(fileURLWithPath: self)
    let nameParts = fileURL.lastPathComponent.components(separatedBy: ".")
    let maxExtLength = 2

    if nameParts.count > 1 && FileTypeCheker.getFileType(fileExtension: fileURL.pathExtension) == nil {
      return nameParts.suffix(min(maxExtLength, nameParts.count - 1)).joined(separator: ".")
    }

    return fileURL.pathExtension
  }
  
  func convertJSONStringToObject<T: Codable>(type: T.Type) -> T? {
    let decoder = JSONDecoder()
    
    if let dictinary = self.convertJSONStringToDictinary() {
      do {
        let data = try JSONSerialization.data(withJSONObject: dictinary, options: [])
        return try decoder.decode(T.self, from: data)
      } catch (let error){
        print(error.localizedDescription)
      }
    }
    
    return nil
  }
  
  func convertJSONStringToDictinary() -> [String: Any]? {
    do {
      let data = Data(self.utf8)
      if let json = try JSONSerialization.jsonObject(with: data, options: []) as? [String: Any] {
        return json
      }
    } catch let error as NSError {
      print("Failed to load: \(error.localizedDescription)")
    }
    
    return nil
  }
  
  var shortChannelName: String {
    return self.components(separatedBy: " ").map { $0.firstSymbol.value.uppercased() }.prefix(2).joined()
  }
  
  func deletingPrefix(_ prefix: String) -> String {
    guard self.hasPrefix(prefix) else { return self }
    return String(self.dropFirst(prefix.count))
  }
  
  static func randomString(length: Int) -> String {
    let letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    return String((0..<length).map{ _ in letters.randomElement()! })
  }
  
  var encodedString: String? {
    if let regex = try? NSRegularExpression(pattern: "[\\~\\/:\\*\"<>\\|\\+\\#\\?\\%\\&]", options: .caseInsensitive) {
      return regex.stringByReplacingMatches(in: self, options: [], range: NSRange(0..<self.utf16.count), withTemplate: "-")
    }
    
    return nil
  }
  
  subscript (bounds: CountableClosedRange<Int>) -> String {
    let start = index(startIndex, offsetBy: bounds.lowerBound)
    let end = index(startIndex, offsetBy: bounds.upperBound)
    return String(self[start...end])
  }
  
  subscript (bounds: CountableRange<Int>) -> String {
    let start = index(startIndex, offsetBy: bounds.lowerBound)
    let end = index(startIndex, offsetBy: bounds.upperBound)
    return String(self[start..<end])
  }
  
  var beginsWithEmoji: Bool {
    return self.first?.isEmoji ?? false
  }
  
  var firstSymbol: String? {
    if self.beginsWithEmoji && self.count >= 1  {
      return self[0..<1]
    } else if let first = self.first {
      return String(first)
    } else {
      return nil
    }
  }
  
  func stringToDateWithFormat(_ format: String) -> Date? {
    let dateFormatter = DateFormatter()
    dateFormatter.dateFormat = format
    return dateFormatter.date(from: self)
  }
}

extension Character {
  func unicodeScalarCodePoint() -> Int32 {
    let characterString = String(self)
    let scalars = characterString.unicodeScalars
    
    return Int32(scalars[scalars.startIndex].value)
  }

  var isSimpleEmoji: Bool {
    guard let firstScalar = unicodeScalars.first else { return false }
    return firstScalar.properties.isEmoji && firstScalar.value > 0x238C
  }
  
  var isCombinedIntoEmoji: Bool {
    return unicodeScalars.count > 1 && unicodeScalars.first?.properties.isEmoji ?? false
  }
  
  var isEmoji: Bool { isSimpleEmoji || isCombinedIntoEmoji }
}

extension StringProtocol {
    func index<S: StringProtocol>(of string: S, options: String.CompareOptions = []) -> Index? {
        range(of: string, options: options)?.lowerBound
    }
    func endIndex<S: StringProtocol>(of string: S, options: String.CompareOptions = []) -> Index? {
        range(of: string, options: options)?.upperBound
    }
    func indices<S: StringProtocol>(of string: S, options: String.CompareOptions = []) -> [Index] {
        ranges(of: string, options: options).map(\.lowerBound)
    }
    func ranges<S: StringProtocol>(of string: S, options: String.CompareOptions = []) -> [Range<Index>] {
        var result: [Range<Index>] = []
        var startIndex = self.startIndex
        while startIndex < endIndex,
            let range = self[startIndex...]
                .range(of: string, options: options) {
                result.append(range)
                startIndex = range.lowerBound < range.upperBound ? range.upperBound :
                    index(range.lowerBound, offsetBy: 1, limitedBy: endIndex) ?? endIndex
        }
        return result
    }
}
