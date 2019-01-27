import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './index.scss';

import { connect } from 'react-redux'

class Counter extends Component {
  init() {
    let rafTimer = null;
    let outTimer = null;
    const letters = 'ZABCDEFGHIJKLMNOPQRSTUVWXY'.split('');
    const canvas = this.canvas;
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, width, height);

    const drawLetter = () => {
      ctx.clearRect(0,0,width,height);
      letters.push(letters.shift());
      ctx.font = "200px impact";
      ctx.fillStyle = "#fff";
      ctx.textBaseline = "middle";
      ctx.textAlign = 'center';
      ctx.fillText(letters[0], width/2, height/2);
    };

    function Point (x, y) {
      this.x = x;
      this.y = y;
      this.totalTimes = Math.random()* 2000 / 16.67;
      this.startCount = 0;
      this.x2 = width / 2;
      this.y2 = height / 2;
      // this.vx = (x <= (width / 2) ? -1 : 1)*Math.random()* 10;
      // this.vy = (y <= (height / 2) ? -1 : 1)*Math.random()* 10;

      this.vx = Math.pow( -1 , Math.ceil( Math.random()*1000 ) ) * (Math.random() + 0.2) * 10;
      this.vy = Math.pow( -1 , Math.ceil( Math.random()*1000 ) ) * (Math.random() + 0.2) * 10;
      this.color = `rgba(${getColor()},${getColor()}, ${getColor()}, 255)`;
    }

    const getPoints = () => {
      var imgData = ctx.getImageData(0,0,width,height);
      var gap = 6;
      const points = [];
      for (var x = 0; x < imgData.width; x += gap) {
        for (var y = 0; y < imgData.height; y += gap) {
          const i = (y * imgData.width + x)*4;
          if (imgData.data[i] === 255 && imgData.data[i+1] === 255 && imgData.data[i+2] === 255 && imgData.data[i+3] === 255 ) {
            points.push(new Point(x, y));
          }
        }
      }
      return points;
    }

    const getColor = () => {
      return Math.floor(Math.random()* 255);
    }

    const drawCircle = (dot) => {
      ctx.fillStyle = dot.color;
      ctx.beginPath();
      ctx.arc(dot.x2, dot.y2, 2, 0, 2 * Math.PI);
      ctx.fill();
    }

    const drawPoints = () => {
      const datas = getPoints();
      ctx.clearRect(0,0,width,height);
      datas.forEach(item => {
        drawCircle(item);
      });
      return datas;
    }

    const loop = () => {
      drawLetter();
      const datas = drawPoints();
      const allOut = true;
      let counts = 10;

      const moveTo = () => {
        ctx.clearRect(0,0,width,height);
        datas.forEach(item => {
          const targetX = item.x - item.x2;
          const targetY = item.y - item.y2;
          const speedX = targetX / 10;
          const speedY = targetY / 10;
          item.x2 += speedX;
          item.y2 += speedY;
          drawCircle(item);
          counts--;
          if(!counts) {
            cancelAnimationFrame(rafTimer);
          }

        });

        if (rafTimer) cancelAnimationFrame(rafTimer);
        rafTimer = requestAnimationFrame(moveTo);
      };
      moveTo();
      const animate = () => {
        let idx=0;
        ctx.clearRect(0,0,width,height);
        datas.forEach(item => {
          // const xD = item.vx * item.totalTimes - item.x;
          // const yD = item.vy * item.totalTimes - item.y;
          // item.x2 = easeInOutCubic(item.startCount, item.x, xD, item.totalTimes);
          // item.y2 = easeInOutCubic(item.startCount, item.y, yD, item.totalTimes);
          item.x2 += item.vx;
          item.y2 += item.vy;
          item.startCount += 1;
          drawCircle(item);
          if (item.x2 - 3>= 0 && item.x2 - 3 <= width && item.y2 - 3 >=0 && item.y2 -3 <= height ) {
            datas[idx] = item;
            idx++;
          }
        })

        if (idx < datas.length) {
          datas.splice(idx, datas.length - idx);
        }
        if (rafTimer) cancelAnimationFrame(rafTimer);
        rafTimer = requestAnimationFrame(animate);
        if (!datas.length) {
          cancelAnimationFrame(rafTimer);
          loop();
        }
      };
      if (outTimer) clearTimeout(outTimer);
      setTimeout(animate, 1000);
    }

    loop()

  }
  componentDidMount() {
    this.init();
  }
  render() {
    return (
      <div className="canvas-container">
        <canvas className="canvas" width="400px" height="400px" ref={ node => this.canvas = node }>
        </canvas>
      </div>
    )
  }
}

Counter.propTypes = {
}

export default Counter;
