import React, {Component} from 'react';
import './Slider.scss';
class Slider extends Component {
  constructor(props) {
    super(props);   
    this.state={
      index:1,
      animating:false,
      style:{left:'0px',height:this.props.itemHeight,width:this.props.itemWidth*this.props.number},
      boxStyle:{height:this.props.itemHeight,width:this.props.itemWidth},
      transitionTime:this.props.transitionTime || 1000,
      delayTime:this.props.delayTime || 3000,
      autoPlay:this.props.autoPlay|| false,
    }
    this.animate = this.animate.bind(this);
    this.play = this.play.bind(this);
    this.next = this.next.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(event) {
    let targetIndex=parseInt(event.target.innerHTML);
    if(this.state.animating ||this.state.index== targetIndex){
      return;
    }
    let offset = -1*this.props.itemWidth *(targetIndex - this.state.index);
    this.animate(offset);
    this.setState({
      index:targetIndex,
      animating:true,
    })
  }
  /**
   * 内容轮次播放函数
   *[@param] offset 播放距离
  **/
  animate(offset) {
    //移动距离为0 或正在进行移动
    if(offset == 0||this.state.animating){
      return;
    }
    //animate 开始执行, animating 标记状态
    this.setState({
      animating:true,
    })
    const sliderTarget = this.refs.list;//平移目标
    const inteval = 10; //每秒动作次数
    let speed = offset/(this.state.transitionTime/inteval);//宏观平移速度
    let left = parseInt(this.refs.list.style.left) + offset;//平移目标执行后位置

    const go = () => {
      //执行平移
      const _this = this;
      if ( (speed > 0 && parseInt(sliderTarget.style.left) < left) || (speed < 0 && parseInt(sliderTarget.style.left) > left)) {
        this.setState({
           style:{left: parseInt(_this.refs.list.style.left) + speed + 'px',height:_this.props.itemHeight,width:_this.props.itemWidth*_this.props.number},
        })
        setTimeout(go, inteval);// 默认动作分为10次,产生动画效果, 执行十次go()
      }else {
        //内容更替成功, 执行停顿展示内容, 时间为delayTime
        setTimeout(function(){_this.state.animating = false;},_this.state.delayTime)
      }
    };
    go();
    //animate 执行完成,animating 状态释放
    this.setState({
      animating:false,
    })
  }
  /**
   * 显示下一个展示内容
   * 如执行时为最后一个,默认显示到第一个展示内容
  **/
  next() {
    if (this.state.animating) {
      return;
    }
    if (this.state.index == this.props.number) {
      this.animate(this.props.itemWidth*(this.props.number - 1));
      this.setState({
        index:1,
        animating:true
      })
    }else {
      this.animate(-1*this.props.itemWidth);
      this.setState({
        index:this.state.index+1,
        animating:true
      })     
    }
  }
  /**
   * 自动轮播展示内容
   * 如执行时为最后一个,默认显示到第一个展示内容
  **/
  play() {
    const _this = this;
     _this.timer = setInterval(function () {
      if(!_this.state.animating){
        _this.next();
      }
    }, _this.state.delayTime);
  }
  componentDidMount() {
    if(this.state.autoPlay){
     this.play();
    }
  }
  componentWillUnmount(){
    clearInterval(this.timer);
  }
  render(){
    const index = this.state.index;
    const buttonList=[];
    for(let i=1; i <=this.props.number; i++ ){
      buttonList.push(React.createElement('li',{key:i, onClick:this.handleClick, className :`${index == i ? 'dot active':'dot'}`},i));
    }
    return (
      <div className='slider-container' style={this.state.boxStyle} >
        <div className="list" ref='list' style={this.state.style}>
          {/*轮播内容列表*/}
          {this.props.children}
        </div>
        {this.state.autoPlay &&
          <ol className="dots">
            {buttonList}
          </ol>
        }
     </div>
    )
  }
}
export default Slider;
