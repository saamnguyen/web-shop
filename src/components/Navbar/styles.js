import { makeStyles } from "@mui/styles";

const drawerWidth = 0;

export default makeStyles((theme) => ({
	appBar: {
		boxShadow: "none",
		borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
		// [theme.breakpoints.up("sm")]: {
		// 	width: `calc(100% - ${drawerWidth}px)`,
		// 	marginLeft: drawerWidth,
		// },
	},
	title: {
		flexGrow: 1,
		alignItems: "center",
		display: "flex",
		textDecoration: "none",
	},
	image: {
		marginRight: "10px",
	},
	menuButton: {},
	grow: {
		flexGrow: 1,
	},
	search: {
		position: "relative",

		marginLeft: 0,
		width: "100%",
	},
	searchIcon: {
		height: "100%",
		position: "absolute",
		pointerEvents: "none",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	inputRoot: {
		color: "inherit",
	},
}));
