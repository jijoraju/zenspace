// toastService.js
import { toast } from 'react-toastify';

export const showToast = (message, type = 'info', s= 3000,icon) => {

  // const {
  //   type = 'info',
  //   duration = 5000, // 指定顯示時間，以毫秒為單位
  //   position = toast.POSITION.TOP_CENTER, // 指定位置
  //   toastClassName = '', // 添加自定義 CSS 類
  // } = options;

  switch (type) {
    case 'success':
      toast.success(message,{
        position: toast.POSITION.TOP_CENTER,
        className:'toast-promise',
        autoClose: s,
        ...icon,
      });
      break;
    case 'error':
      toast.error(message,{
        position: toast.POSITION.TOP_CENTER,
        className:'toast-promise',
        autoClose: s,
      });
      break;
    case 'warning':
      toast.warning(message,{
        position: toast.POSITION.TOP_CENTER,
        className:'toast-promise',
        autoClose: s,
      });
      break;
    case 'info':
      toast.info(message,{
        position: toast.POSITION.TOP_CENTER,
        className:'toast-promise',
        autoClose: s,
        ...icon,
      });
      break;
    default:
      toast(message,{
        position: toast.POSITION.TOP_CENTER,
        className:'toast-promise',
        autoClose: s,
        ...icon,
      });
      break;
  }
};

export const closeToast = ()=>{
  toast.dismiss();
}

export const toastPromise = (requestApi,option)=>{
  toast.promise(
    requestApi,
    {
      className: 'toast-promise',
      pending: 'Promise is pending',
      autoClose: 1500,
      position: toast.POSITION.TOP_CENTER,
      ...option,
    },
  )
}