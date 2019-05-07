import { Canvas } from '@tarojs/components';
import Taro, { Component, Config } from '@tarojs/taro';
import lottie from 'lottie-miniapp';
import './index.less';

export default class Index extends Component {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页'
  };

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {
    const canvasContext = wx.createCanvasContext('test-canvas');
    // 请求lottie的路径。注意开启downloadFile域名并且返回格式是json
    const animationPath =
      'https://github.com/landn172/lottie-miniapp/files/3146709/data2.txt';

    // 指定canvas大小
    canvasContext.canvas = {
      width: 300,
      height: 300
    };

    // 如果同时指定 animationData 和 path， 优先取 animationData
    lottie.loadAnimation({
      renderer: 'canvas', // 只支持canvas
      loop: true,
      autoplay: true,
      path: animationPath,
      rendererSettings: {
        context: canvasContext,
        clearCanvas: true
      }
    });
  }

  componentDidHide() {}

  render() {
    return (
      <Canvas id='test-canvas' canvasId='test-canvas' className='test-canvas' />
    );
  }
}
