/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import { BsClipboardData } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import logo from "./logo1.png";
import home from "./home.png";
import "../NavBar.css";
export default class Home extends Component {
  render() {
    return (
      <div id='main'>
        <div className='homepage'>
          <p className='elements' id='title'>
            KMA<span id='student'>-CLUB</span>
          </p>
          <hr className='elements' id='homehr' />
          <div className='introduction'>
            <h1 className='manage'>
              KMA - CLUB
              <div id='_manage'>giúp ích cho việc</div> theo dõi CLUB - CNTT
            </h1>
            <div className='manage_1'>
              <img
                src={logo}
                width='300rem'
                height='200rem'
                style={{ marginTop: "-8rem", marginRight: "7rem" }}
              />
            </div>
            <p id='_intro1'>
              KMA CLUB là trang web giúp chủ nhiệm CLB có thể nắm bắt được tình hình CLB một cách tường minh và rõ ràng
              và hộ trợ giao tiếp giữa chủ nhiệm CLB và thành viên

            </p>
            <img className='homewallpaper' src={home} />
            <div className='footer1'>
              <br />
              <p id='_footer2'>
                Hiện nay các CLB chưa có biện pháp để theo dõi thành viên trong CLB, nắm bắt được
                tình hình. Từ đó KMA CLUB sẽ cung cấp một giải
                pháp phù hợp nhất tất cả trong một nền tảng đơn giản và đẹp mắt.
              </p>
            </div>

            {/* FOOTER CHUC NANG */}

            <div className='footer2'>
              <hr className='elements' id='homehr' />
              <h1 id='_footer1'>Các tính năng của KMA CLUB</h1>

              <div className='footer_icons'>
                <span className='fa fa-comment-dots'></span>
              </div>
              <div className='footer_icons'>
                <span className='fa fa-chart-bar'></span>
              </div>
              <div className='footer_icons'>
                <BsClipboardData />
              </div>
              <div className='footer_icons'>
                <IoMdNotificationsOutline />
              </div>
              <br />

              <div className='footer_fn' id='footer_fn1'>
                Chat
              </div>
              <div className='footer_fn' id='footer_fn2'>
                Biểu đồ hoạt  động
              </div>
              <div className='footer_fn' id='footer_fn3'>
                Danh sách thành viên
              </div>
              <div className='footer_fn' id='footer_fn4'>
                Thông báo
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
