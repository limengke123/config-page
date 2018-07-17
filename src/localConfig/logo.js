import logo1 from '../assets/image/1.png'
import logo2 from '../assets/image/2.png'
import logo3 from '../assets/image/3.png'
import logo4 from '../assets/image/4.png'
import logo5 from '../assets/image/5.png'
import logo6 from '../assets/image/6.png'
import logo7 from '../assets/image/7.png'
import logo8 from '../assets/image/8.png'



const logoArr = [logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8]


/**
 * @param {Number} index 需要的图片索引
 * @return {String} 对应索引地址
 * */
export const getLogo = (index) => {
    /**
     * 循环这8个logo图片
     * 超过length
     * */
    return logoArr[index % logoArr.length]
}

