import { Components, Theme, Typography } from "@mui/material";

import { typographyTheme } from "./typography";
import { COLOR_PALETTE, COMPONENT_STATE, PSEUDO_STATE } from "@/configuration";

import {
  ClearIcon,
  PrevButton,
  NextButton,
  UncheckIcon,
  ArrowDownIcon,
  CheckedIcon,
  FirstButton,
  LastButton,
} from "@/components";

export const ComponentsTheme: Components<Omit<Theme, "components">> = {
  MuiTypography: {
    defaultProps: {},
    styleOverrides: {
      root: ({ theme }) => {
        return {
          display: "block",
          color: theme.palette.text.primary,
        };
      },
    },
  },

  MuiContainer: {
    defaultProps: {
      maxWidth: "xl",
    },
  },
  MuiTabs: {
    styleOverrides: {
      root: ({ theme }) => {
        return {
          "& .MuiTabs-flexContainer": {
            display: "flex",
            flexDirection: "row !important",
            justifyContent: "center !important",
          },
        };
      },
    },
  },

  MuiTab: {
    defaultProps: {
      disableRipple: true,
    },

    styleOverrides: {
      root: ({ theme }) => {
        return {
          ...theme.typography.p_small,
          fontWeight: 500,
          textTransform: "capitalize",
          color:
            theme.palette.mode === "dark"
              ? theme.palette.common.white
              : theme.palette.common.black,

          [COMPONENT_STATE.selected]: {
            ...theme.typography.p_small,
            fontWeight: 500,
            color: theme.palette.primary.main,

            "& .MuiTypography-root": {
              color: theme.palette.primary.main,
            },
          },
        };
      },
    },
  },

  MuiButton: {
    defaultProps: {
      disableRipple: true,
    },

    styleOverrides: {
      root: ({ theme }) => {
        return {
          ...typographyTheme["p_small"],
          fontWeight: 500,
          backgroundColor: theme.palette.primary.main,
          color: "white",
          borderRadius: "6px",
          padding: "0.5rem 1rem",

          [PSEUDO_STATE.hover]: {
            backgroundColor: theme.palette.primary.light,
            transition: "all .4s ease",
          },

          [COMPONENT_STATE.disabled]: {
            backgroundColor: "#f5f5f5",
          },
        };
      },
      contained: ({ theme }) => {
        return {
          backgroundColor: theme.palette.primary.main,
          transition: "all .4s ease",
          "&:hover": {
            backgroundColor: theme.palette.primary.light,
          },
        };
      },
      outlined: ({ theme }) => {
        return {
          background: "none",
          border: `1px solid ${theme.palette.text.primary}`,
          transition: "all .4s ease",
          fontWeight: 600,
          color: theme.palette.text.primary,
          "&:hover": {
            border: `1px solid ${theme.palette.primary.main}`,
            background: theme.palette.primary.main,
            color: "white",
            opacity: 1,
          },
        };
      },
    },
  },

  MuiFormControl: {
    defaultProps: {
      fullWidth: true,
    },
    styleOverrides: {
      root: ({ theme }) => {
        return {
          ["& .MuiFormLabel-root"]: {
            ...typographyTheme["p_small"],
            fontWeight: 600,
            marginBottom: "0.3rem",
            color: theme.palette.text.primary,
          },
          ["& .MuiFormHelperText-root"]: {
            marginTop: 2,
          },
        };
      },
    },
  },

  MuiInputBase: {
    styleOverrides: {
      root: ({ theme }) => {
        return {
          caretColor: theme.palette.primary.main,
          borderRadius: "6px",
          padding: "10px 12px",
          marginTop: "0 !important",
          border: `1px solid ${theme.palette.border.main}`,

          "& .MuiInputBase-input": {
            padding: 0,
            color: `${theme.palette.text.primary} !important`,
          },
          "&.Mui-focused": {
            border: `1px solid ${theme.palette.primary.main} !important`,
          },
          "&::after": {
            display: "none",
          },

          "&::before": {
            display: "none",
          },
        };
      },
    },
  },

  MuiCheckbox: {
    defaultProps: {
      icon: <UncheckIcon />,
      checkedIcon: <CheckedIcon />,
    },
  },

  MuiLink: {
    styleOverrides: {
      root: {
        textDecoration: "none",
      },
    },
  },

  MuiDivider: {
    styleOverrides: {
      root: {
        backgroundColor: COLOR_PALETTE["white"],
      },
    },
  },

  MuiFormHelperText: {
    styleOverrides: {
      root: {
        marginTop: 0,
        fontSize: "15px",
        lineHeight: "20px",
        fontWeight: 500,
      },
    },
  },

  MuiPagination: {
    styleOverrides: {
      root: ({ theme }) => {
        return {
          "& .MuiPagination-ul": {
            "& button": {},

            "& .Mui-selected": {
              color: theme.palette.common.white,
              backgroundColor: theme.palette.primary.main,
              borderRadius: 6,
            },
          },
        };
      },
    },
  },

  MuiBadge: {
    styleOverrides: {
      root: ({ theme }) => {
        return {
          "& .MuiBadge-badge": {
            background: theme.palette.primary.main,
            color: theme.palette.common.white,
          },
        };
      },
    },
  },

  MuiPaginationItem: {
    styleOverrides: {
      root: {
        [PSEUDO_STATE.hover]: {
          borderRadius: 6,
        },
      },
    },
    defaultProps: {
      slots: {
        previous: PrevButton,
        next: NextButton,
        first: FirstButton,
        last: LastButton,
      },
    },
  },

  MuiAutocomplete: {
    styleOverrides: {
      root: {},
      paper: {
        margin: "5px -5px",
      },
      listbox: ({ theme }) => {
        return {
          padding: 0,
          borderRadius: 6,
          border: `2px solid ${theme.palette.primary.main}`,

          ["& .MuiAutocomplete-option.Mui-focused"]: {
            color: theme.palette.common.white,
            backgroundColor: theme.palette.primary.main,
          },
        };
      },

      inputRoot: {
        borderRadius: "6px",
        padding: "6px 12px !important",
      },

      option: ({ theme }) => {
        return {
          color:
            theme.palette.mode === "dark"
              ? theme.palette.common.white
              : theme.palette.common.black,

          backgroundColor:
            theme.palette.mode === "dark"
              ? theme.palette.common.black
              : theme.palette.common.white,

          ["&:hover"]: {
            opacity: 0.7,
            backgroundColor: `${theme.palette.primary.main} !important`,
            color: theme.palette.common.white,
          },

          [`&[aria-selected="true"]`]: {
            backgroundColor: `${theme.palette.primary.main} !important`,
          },
        };
      },
      endAdornment: {
        right: 16,
      },
    },

    defaultProps: {
      popupIcon: <ArrowDownIcon />,
      clearIcon: <ClearIcon />,
    },
  },

  MuiBreadcrumbs: {
    styleOverrides: {
      root: ({ theme }) => {
        return {};
      },
    },

    defaultProps: {
      separator: <Typography>Phat</Typography>,
    },
  },
};
