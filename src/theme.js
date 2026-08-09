import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",

    primary: {
      main: "#2563eb",
    },

    secondary: {
      main: "#7c3aed",
    },

    success: {
      main: "#16a34a",
    },

    warning: {
      main: "#f59e0b",
    },

    error: {
      main: "#dc2626",
    },

    background: {
      default: "#f5f7fb",
      paper: "#ffffff",
    },
  },

  typography: {
    fontFamily: "'Poppins', sans-serif",

    h4: {
      fontWeight: 700,
      color: "#1e293b",
    },

    h5: {
      fontWeight: 600,
    },

    h6: {
      fontWeight: 600,
    },

    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },

  shape: {
    borderRadius: 12,
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: "10px 18px",
          fontWeight: 600,
          boxShadow: "none",

          "&:hover": {
            boxShadow: "0 8px 20px rgba(37,99,235,.25)",
          },
        },

        containedPrimary: {
          background:
            "linear-gradient(135deg,#2563eb,#4f46e5)",

          color: "#fff",
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 15,
          boxShadow: "0 10px 25px rgba(0,0,0,.08)",
        },
      },
    },

    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 18,
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        size: "small",
      },
    },

    MuiTableHead: {
      styleOverrides: {
        root: {
          background: "#2563eb",

          "& th": {
            color: "#fff",
            fontWeight: 700,
            fontSize: "15px",
          },
        },
      },
    },

    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:hover": {
            background: "#f3f4f6",
          },
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
        },
      },
    },

    MuiTablePagination: {
      styleOverrides: {
        toolbar: {
          background: "#fff",
        },
      },
    },
  },
});

export default theme;