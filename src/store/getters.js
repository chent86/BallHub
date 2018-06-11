const getters = {
  sidebar: state => state.app.sidebar,
  username: state => state.console_user.info.username,
  user_id: state => state.console_user.info.user_id,
  age: state => state.console_user.info.age,
  sex: state => state.console_user.info.sex,
  free_time: state => state.console_user.info.free_time,
  role: state => state.console_user.info.role,
  price: state => state.console_user.info.price,
  team_name: state => state.console_user.info.team_name,
  auth: state => state.console_user.auth,
};
export default getters;
