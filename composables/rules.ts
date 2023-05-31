export const useFormRules = () => {
  return {
    ruleRequired: (v: any): boolean | string => {
      return !!v || "Required";
    },

    ruleEmail: (value: any): boolean | string => {
      const pattern =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return pattern.test(value) || "Enter a valid email";
    },

    rulePassLen: (v: string): boolean | string => {
      return (!!v && v.length >= 6) || "Password must be 6 chars or more";
    },

    rulePhoneNumber: (v: string): boolean | string => {
      const reg = /^\d{3}-\d{3,4}-\d{4}$/;
      if (reg.test(v) == true) return true;

      return "Invalid Phone number";
    },

    ruleUserId: (v: string): boolean | string => {
      if (v !== undefined) {
        const reg = /^[a-zA-Z]+[a-zA-Z\-0-9]{8,30}$/;
        if (v.match(reg)) {
          return true;
        }
      }

      return "Invalid user ID";
    },
  };
};
