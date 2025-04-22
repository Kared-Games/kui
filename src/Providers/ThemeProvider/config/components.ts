import { Components } from "@mui/material/styles";

/**
 * Components configuration
 * @see https://mui.com/material-ui/customization/theme-components/#theme-style-overrides
 */
const config: Components = {
  MuiUseMediaQuery: {
    defaultProps: {
      noSsr: true,
    },
  },

  MuiAppBar: {
    styleOverrides: {
      root: {
        backgroundImage: "none",
      },
    },
  },

  MuiAlert: {
    styleOverrides: {
      action: {
        marginRight: "0 !important",
      },
      message: {
        alignItems: "center",
        alignContent: "center",
      },
      // colorSuccess: {
      //   backgroundColor: "#41bb65",
      // },
      // colorError: {
      //   backgroundColor: "#f44336",
      // },
      // colorWarning: {
      //   backgroundColor: "#ff9800",
      // },
      // colorInfo: {
      //   backgroundColor: "#2196f3",
      // },
    },
  },

  MuiCard: {
    styleOverrides: {
      root: {
        // <offset-x> <offset-y> <blur-radius> <spread-radius> <color>
        boxShadow:
          "1px 1px 3px -1px rgba(0, 0, 0, 0.2), 1px 1px 3px 1px rgba(0, 0, 0, 0.12)",
        borderRadius: "8px",
      },
      // header: {
      //   padding: "16px 8px",
      // },
    },
  },

  MuiChip: {
    styleOverrides: {
      root: {
        width: "fit-content",
      },
      label: {
        fontWeight: 600,
      },
    },
  },

  MuiCardHeader: {
    styleOverrides: {
      root: {
        padding: "16px 16px 8px 16px",
      },
    },
  },

  MuiCardContent: {
    styleOverrides: {
      root: {
        padding: "8px 16px 16px 16px",
        "&:last-child": {
          paddingBottom: 16,
        },
      },
    },
  },

  MuiAvatar: {
    styleOverrides: {
      colorDefault: {
        backgroundColor: "#5965b0",
      },
      rounded: {
        borderRadius: "8px",
      },
    },
  },

  MuiStack: {
    styleOverrides: {
      root: {
        width: "100%",
        backgroundColor: "transparent !important",
      },
    },
  },

  // MuiTabPanel: {
  //   styleOverrides: {
  //     root: {
  //       // Pour éviter la marge des TabPanel hidden
  //       "&[hidden]": {
  //         marginTop: "0 !important",
  //       },
  //     },
  //   },
  // },

  MuiDivider: {
    styleOverrides: {
      root: {
        width: "100%",
      },
    },
  },

  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: "8px",
      },
      containedPrimary: {
        fontWeight: 600,
      },
    },
  },

  MuiTypography: {
    styleOverrides: {
      root: {
        overflowWrap: "anywhere",
        whiteSpace: "break-spaces",
      },
    },
  },
};

// ----------------------------------------------------------------------

export default config;
