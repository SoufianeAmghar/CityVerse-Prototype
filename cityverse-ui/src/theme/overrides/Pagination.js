export default function Pagination(theme) {
  return {
    MuiPagination: {
      styleOverrides: {
        root: {
          "& > *": {
            marginTop: theme.spacing(2),
            justifyContent: "center",
            display: "flex",
          },
        },
      },
    },
  };
}
