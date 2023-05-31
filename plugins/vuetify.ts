import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

export default defineNuxtPlugin((NuxtApp) => {
  const vuetify = createVuetify({
    ssr: true,
    components,
    directives,
    defaults: {
      VAppBar: {
        elevation: 0,
      },
      VCombobox: {
        variant: "outlined",
        height: 38,
        rounded: "lg",
        size: "small",
      },
      VBtn: {
        variant: "flat",
        height: 38,
        rounded: "lg",
        size: "small",
      },
      VTextField: {
        color: "primary",
        variant: "outlined",
        density: "comfortable",
      },
    },
  });

  NuxtApp.vueApp.use(vuetify);
});
