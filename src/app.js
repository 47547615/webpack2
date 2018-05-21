import React from 'react';
import react_dom from 'react-dom';

// 全局CSS
import './common/common.css';
import 'font-awesome/css/font-awesome.css';

// 模块化的CSS
import main from './main.css';

import img1 from './img/4.jpg';


react_dom.render(
    <div>
        <a href="http://www.react.com">这是React插入进来的内容.</a>
        <div className={main.ot}> Hello,React World! </div>       
    </div>,
    document.getElementById('root')
);