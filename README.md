# Lottie for Miniapp

## forked from landn172/lottie-miniapp

Thanks landn172.

## 使用方式

1. 下载并拷贝 dist/i-lottie 内容至小程序 components 目录下；
2. 在需要引入的 pages 页面中增加引用：

``` test.json

"usingComponents": {
  "i-lottie": "../../components/i-lottie/lottie"
}

```

``` test.wxml

<i-lottie id="lottie" path="{{aniPath}}" width="{{width}}" 
  height="{{height}}" animation-data="{{anidata}}">
</i-lottie>

```

``` test.js
  data: {
    width: 300,
    height: 300,
    aniPath: '',    // Web URL
    anidata: {}     // JSON
  }
```