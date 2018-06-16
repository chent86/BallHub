const getters = {
  sidebar: state => state.app.sidebar,
  name: state => state.console_user.info.name,
  username: state => state.console_user.info.username,
  birthday: state => state.console_user.info.birthday,
  sex: state => state.console_user.info.sex,
  free_time_1: state => state.console_user.info.free_time_1,
  free_time_2: state => state.console_user.info.free_time_2,
  role: state => state.console_user.info.role,
  price: state => state.console_user.info.price,
  motto: state => state.console_user.info.motto,
  auth: state => state.console_user.auth,
  myGame_tableInfo: state => state.console_user.info.myGame_tableInfo,
  allGame_tableInfo: state => state.console_user.info.allGame_tableInfo
};
export default getters;
