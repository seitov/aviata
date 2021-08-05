module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `
          @import "~@/assets/styles/layout/_mixin.scss";
          @import "~@/assets/styles/layout/_variables.scss";
        `,
      },
    },
  },
};
