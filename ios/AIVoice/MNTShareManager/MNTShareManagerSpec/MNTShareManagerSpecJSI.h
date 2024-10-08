/**
 * This code was generated by [react-native-codegen](https://www.npmjs.com/package/react-native-codegen).
 *
 * Do not edit this file as changes may cause incorrect behavior and will be lost
 * once the code is regenerated.
 *
 * @generated by codegen project: GenerateModuleH.js
 */

#pragma once

#include <ReactCommon/TurboModule.h>
#include <react/bridging/Bridging.h>

namespace facebook {
namespace react {


  
#pragma mark - MNTShareManagerBaseShareOptions

template <typename P0, typename P1, typename P2, typename P3, typename P4, typename P5>
struct MNTShareManagerBaseShareOptions {
  P0 message;
  P1 subtitle;
  P2 tintColor;
  P3 title;
  P4 url;
  P5 userInterfaceStyle;
  bool operator==(const MNTShareManagerBaseShareOptions &other) const {
    return message == other.message && tintColor == other.tintColor && title == other.title && url == other.url && userInterfaceStyle == other.userInterfaceStyle;
  }
};

template <typename P0, typename P1, typename P2, typename P3, typename P4, typename P5>
struct MNTShareManagerBaseShareOptionsBridging {
  static MNTShareManagerBaseShareOptions<P0, P1, P2, P3, P4, P5> fromJs(
      jsi::Runtime &rt,
      const jsi::Object &value,
      const std::shared_ptr<CallInvoker> &jsInvoker) {
    MNTShareManagerBaseShareOptions<P0, P1, P2, P3, P4, P5> result{
      bridging::fromJs<P0>(rt, value.getProperty(rt, "message"), jsInvoker),
      bridging::fromJs<P1>(rt, value.getProperty(rt, "subtitle"), jsInvoker),
      bridging::fromJs<P2>(rt, value.getProperty(rt, "tintColor"), jsInvoker),
      bridging::fromJs<P3>(rt, value.getProperty(rt, "title"), jsInvoker),
      bridging::fromJs<P4>(rt, value.getProperty(rt, "url"), jsInvoker),
      bridging::fromJs<P5>(rt, value.getProperty(rt, "userInterfaceStyle"), jsInvoker)};
    return result;
  }

#ifdef DEBUG
  static jsi::String messageToJs(jsi::Runtime &rt, P0 value) {
    return bridging::toJs(rt, value);
  }
  
  static jsi::String subtitleToJs(jsi::Runtime &rt, P1 value) {
    return bridging::toJs(rt, value);
  }

  static jsi::String tintColorToJs(jsi::Runtime &rt, P2 value) {
    return bridging::toJs(rt, value);
  }

  static jsi::String titleToJs(jsi::Runtime &rt, P3 value) {
    return bridging::toJs(rt, value);
  }

  static jsi::String urlToJs(jsi::Runtime &rt, P4 value) {
    return bridging::toJs(rt, value);
  }

  static jsi::String userInterfaceStyleToJs(jsi::Runtime &rt, P5 value) {
    return bridging::toJs(rt, value);
  }
#endif

  static jsi::Object toJs(
      jsi::Runtime &rt,
      const MNTShareManagerBaseShareOptions<P0, P1, P2, P3, P4, P5> &value,
      const std::shared_ptr<CallInvoker> &jsInvoker) {
    auto result = facebook::jsi::Object(rt);
    if (value.message) {
      result.setProperty(rt, "message", bridging::toJs(rt, value.message.value(), jsInvoker));
    }
    if (value.subtitle) {
      result.setProperty(rt, "subtitle", bridging::toJs(rt, value.message.value(), jsInvoker));
    }
    if (value.tintColor) {
      result.setProperty(rt, "tintColor", bridging::toJs(rt, value.tintColor.value(), jsInvoker));
    }
    if (value.title) {
      result.setProperty(rt, "title", bridging::toJs(rt, value.title.value(), jsInvoker));
    }
    if (value.subtitle) {
      result.setProperty(rt, "subtitle", bridging::toJs(rt, value.title.value(), jsInvoker));
    }
    if (value.url) {
      result.setProperty(rt, "url", bridging::toJs(rt, value.url.value(), jsInvoker));
    }
    if (value.userInterfaceStyle) {
      result.setProperty(rt, "userInterfaceStyle", bridging::toJs(rt, value.userInterfaceStyle.value(), jsInvoker));
    }
    return result;
  }
};

class JSI_EXPORT NativeShareManagerCxxSpecJSI : public TurboModule {
protected:
  NativeShareManagerCxxSpecJSI(std::shared_ptr<CallInvoker> jsInvoker);

public:
  virtual void share(jsi::Runtime &rt, jsi::Object options) = 0;

};

template <typename T>
class JSI_EXPORT NativeShareManagerCxxSpec : public TurboModule {
public:
  jsi::Value get(jsi::Runtime &rt, const jsi::PropNameID &propName) override {
    return delegate_.get(rt, propName);
  }

  static constexpr std::string_view kModuleName = "MNTShareManager";

protected:
  NativeShareManagerCxxSpec(std::shared_ptr<CallInvoker> jsInvoker)
    : TurboModule(std::string{NativeShareManagerCxxSpec::kModuleName}, jsInvoker),
      delegate_(static_cast<T*>(this), jsInvoker) {}

private:
  class Delegate : public NativeShareManagerCxxSpecJSI {
  public:
    Delegate(T *instance, std::shared_ptr<CallInvoker> jsInvoker) :
      NativeShareManagerCxxSpecJSI(std::move(jsInvoker)), instance_(instance) {}

    void share(jsi::Runtime &rt, jsi::Object options) override {
      static_assert(
          bridging::getParameterCount(&T::share) == 2,
          "Expected share(...) to have 2 parameters");

      return bridging::callFromJs<void>(
          rt, &T::share, jsInvoker_, instance_, std::move(options));
    }

  private:
    T *instance_;
  };

  Delegate delegate_;
};

} // namespace react
} // namespace facebook
