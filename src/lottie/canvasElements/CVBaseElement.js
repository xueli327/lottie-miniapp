import Matrix from '../3rd_party/transformation-matrix';
import CVEffects from './CVEffects';
import CVMaskElement from './CVMaskElement';

class CVBaseElement {
  createElements() {}
  initRendererElement() {}
  createContainerElements() {
    this.canvasContext = this.globalData.canvasContext;
    this.renderableEffectsManager = new CVEffects(this);
  }
  createContent() {}
  setBlendMode() {
    let globalData = this.globalData;
    if (globalData.blendMode !== this.data.bm) {
      globalData.blendMode = this.data.bm;
      let blendModeValue = this.getBlendMode();
      globalData.canvasContext.globalCompositeOperation = blendModeValue;
    }
  }
  addMasks() {
    this.maskManager = new CVMaskElement(this.data, this);
  }
  hideElement() {
    if (!this.hidden && (!this.isInRange || this.isTransparent)) {
      this.hidden = true;
    }
  }
  showElement() {
    if (this.isInRange && !this.isTransparent) {
      this.hidden = false;
      this._isFirstFrame = true;
      this.maskManager._isFirstFrame = true;
    }
  }
  renderFrame() {
    if (this.hidden || this.data.hd) {
      return;
    }
    this.renderTransform();
    this.renderRenderable();
    this.setBlendMode();
    this.globalData.renderer.save();
    this.globalData.renderer.ctxTransform(this.finalTransform.mat.props);
    this.globalData.renderer.ctxOpacity(this.finalTransform.mProp.o.v);
    this.renderInnerContent();
    this.globalData.renderer.restore();
    if (this.maskManager.hasMasks) {
      this.globalData.renderer.restore(true);
    }
    if (this._isFirstFrame) {
      this._isFirstFrame = false;
    }
  }
  destroy() {
    this.canvasContext = null;
    this.data = null;
    this.globalData = null;
    this.maskManager.destroy();
  }

  hide() {
    this.hideElement();
  }

  show() {
    this.showElement();
  }

  mHelper = new Matrix()
}

export default CVBaseElement;
