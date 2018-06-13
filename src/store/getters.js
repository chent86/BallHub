const getters = {
  sidebar: state => state.app.sidebar,
  name: state => state.console_user.info.name,
  user_id: state => state.console_user.info.user_id,
  birthday: state => state.console_user.info.birthday,
  sex: state => state.console_user.info.sex,
  free_time_1: state => state.console_user.info.free_time_1,
  free_time_2: state => state.console_user.info.free_time_2,
  role: state => state.console_user.info.role,
  price: state => state.console_user.info.price,
  motto: state => state.console_user.info.motto,
  auth: state => state.console_user.auth,
};
export default getters;
