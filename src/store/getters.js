const getters = {
  sidebar: state => state.app.sidebar,
  name: state => state.user.info.name,
  username: state => state.user.info.username,
  birthday: state => state.user.info.birthday,
  sex: state => state.user.info.sex,
  free_time_1: state => state.user.info.free_time_1,
  free_time_2: state => state.user.info.free_time_2,
  role: state => state.user.info.role,
  price: state => state.user.info.price,
  motto: state => state.user.info.motto,
  auth: state => state.user.auth,
  all_user: state => state.user.all_user,
  myGame_tableInfo: state => state.game.myGame_tableInfo,
  allGame_tableInfo: state => state.game.allGame_tableInfo,
  myCourt_tableInfo: state => state.court.myCourt_tableInfo,
  allCourt_tableInfo: state => state.court.allCourt_tableInfo,
  myMail_tableInfo: state => state.mail.myMail_tableInfo,
  myResult: state => state.result.myResult
};
export default getters;
