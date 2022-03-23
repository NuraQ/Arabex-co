const AuthRoutes = {
  home: "/home",
  villas: "/Villas",
};
const NonAuthRoutes = {
  login: "/login",
  home: "/home",
  villas: "/Villas/:type",
  Elem: "/Villas/Elem/:id",
  about: "/About",
  update: "/Update",
};

export { NonAuthRoutes, AuthRoutes };
