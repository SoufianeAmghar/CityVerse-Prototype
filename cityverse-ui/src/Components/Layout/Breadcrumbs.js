import React from "react";
import PropTypes from "prop-types";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import { Breadcrumbs as MUIBreadcrumbs, Link, Typography } from "@mui/material";
import { Link as RouterLink, withRouter } from "react-router-dom";
import { emphasize, styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    cursor: "pointer",
    color: "#08089C",
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});

const breadcrumbNameMap = {
  "/programs": "Programmes",
  "/program": "Versions",
  "/program/version": "Treaties",
};
const breadcrumbNameMapfr = {
  "/programs": "Programmes",
  "/program": "Versions",
  "/program/version": "Traités",
};

function ListItemLink(props) {
  const { to, open, ...other } = props;
  const primary = breadcrumbNameMap[to];

  let icon = null;
  if (open != null) {
    icon = open ? <ExpandLess /> : <ExpandMore />;
  }

  return (
    <li>
      <ListItem button component={RouterLink} to={to} {...other}>
        <ListItemText primary={primary} />
        {icon}
      </ListItem>
    </li>
  );
}

ListItemLink.propTypes = {
  open: PropTypes.bool,
  to: PropTypes.string.isRequired,
};

const LinkRouter = (props) => <Link {...props} component={RouterLink} />;

const Breadcrumbs = (props) => {
  const {
    location: { pathname },
  } = props;
  const pathnames = pathname.split("/").filter((x) => x);
  return (
    <MUIBreadcrumbs
      style={{ marginLeft: "1%" }}
      aria-label="breadcrumb"
      separator={<NavigateNextIcon fontSize="small" />}
    >
      <LinkRouter underline="hover" color="inherit" to="/programs">
        <StyledBreadcrumb
          label={
            sessionStorage.getItem("language") === "fr"
              ? "Programmes"
              : "Programs"
          }
          component="a"
        />
      </LinkRouter>
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;

        return last ? (
          <Typography color="text.primary" key={to}>
            <StyledBreadcrumb
              label={
                sessionStorage.getItem("language") === "fr"
                  ? breadcrumbNameMapfr[to]
                  : breadcrumbNameMap[to]
              }
              component="a"
            />
          </Typography>
        ) : (
          <LinkRouter underline="hover" color="inherit" to={to} key={to}>
            <StyledBreadcrumb
              label={
                sessionStorage.getItem("language") === "fr"
                  ? breadcrumbNameMapfr[to]
                  : breadcrumbNameMap[to]
              }
              component="a"
            />
          </LinkRouter>
        );
      })}
    </MUIBreadcrumbs>
  );
};

export default withRouter(Breadcrumbs);
