// import store from '../store'

// export const initMenu = (router, menu) => {
//   if (menu.length === 0) {
//     return
//   }
//   let menus = formatRoutes(menu);
//   // 最后添加
//   let unfound = { path: '*', redirect: '/404', hidden: true }
//   menus.push(unfound)
//   router.addRoutes(menus)
//   store.commit('ADD_ROUTERS',menus)
// }
const routerList = require('./mockTree.json')

export const formatRoutes = (aMenu) => {
  const aRouter = []
  aMenu.forEach(oMenu => {
    const {
      path,
      component,
      children
    } = oMenu
    console.log(component)
    const oRouter = {
      path: path,
      component(resolve) {
        let componentPath = ''
        if (component === 'Layout') {
          require(['./views/Layout'], resolve)
          return false;
        } else {
          componentPath = component
          require([`./components/${componentPath}.vue`], resolve)
        }
      },
      children: children ? formatRoutes(children) : []
    }
    aRouter.push(oRouter)

  })
  return aRouter
}