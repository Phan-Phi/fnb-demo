// import {
//   Container,
//   styled,
//   Collapse,
//   Fade,
//   Grid,
//   Typography,
//   StackProps,
// } from "@mui/material";
// import classNames from "classnames";
// import { useRouter } from "next/router";
// import { useMemo, useState } from "react";

// import Search from "./Search";
// import Language from "./Language";
// import DarkMode from "./DarkMode";
// import { useIntl, useMedia } from "@/hooks";
// import LogoHeader from "./LogoHeader";
// import CartHeader from "./CartHeader";
// import { Box, SearchOutlined, SettingIcon, Stack } from "@/components";

// interface Props {
//   active: boolean;
// }

// interface StyledStackProps extends StackProps {
//   active: boolean;
//   _asPath: boolean;
// }

// export default function AppBarHeader({ active }: Props) {
//   const { isSmDown } = useMedia();
//   const { asPath, pathname } = useRouter();
//   const [checked, setChecked] = useState<string>("noActive");
//   const _asPath =
//     asPath.includes("/order") ||
//     asPath.includes("/cart") ||
//     asPath.includes("/search") ||
//     pathname.includes("/404")
//       ? true
//       : false;

//   const handleChange = (item: string) => {
//     // setChecked((prev) => !prev);
//     setChecked(item);
//   };

//   const renderMobile = useMemo(() => {
//     if (isSmDown) {
//       return (
//         <>
//           <SearchOutlined
//             className="searchOutlined"
//             onClick={() => handleChange(checked === "search" ? "noActive" : "search")}
//           />
//           <SettingIcon
//             onClick={() => handleChange(checked === "setting" ? "noActive" : "setting")}
//           />
//         </>
//       );
//     }
//   }, [isSmDown, checked]);

//   return (
//     <Wrapper>
//       <Container>
//         <WrapperContentTop variant="spaceBetweenCenter" gap={4}>
//           <LogoHeader />

//           <StyledStack spacing={3} direction="row" active={active} _asPath={_asPath}>
//             {renderMobile}

//             {/* <CartHeader active={active} _asPath={_asPath} /> */}
//           </StyledStack>
//         </WrapperContentTop>
//       </Container>

//       <SubMenuSetting active={checked === "setting" ? true : false} />

//       <Collapse in={checked === "search" ? true : false}>
//         <WrapperSearch className={classNames([{ isAnimation: true }])}>
//           <Search active={active} _asPath={_asPath} />
//         </WrapperSearch>
//       </Collapse>
//     </Wrapper>
//   );
// }

// const Wrapper = styled(Box)(({ theme }) => {
//   return {
//     position: "relative",
//     [theme.breakpoints.up("sm")]: {
//       display: "none",
//     },
//   };
// });

// const WrapperSearch = styled(Box)(({ theme }) => {
//   return {
//     width: "100%",
//     padding: "0.7rem",
//   };
// });

// const WrapperContentTop = styled(Stack)(({ theme }) => {
//   return {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: "1.5rem",

//     [theme.breakpoints.down("sm")]: {
//       marginBottom: "1rem",
//     },
//   };
// });

// const StyledStack = styled(Stack, {
//   shouldForwardProp: (propName) => {
//     return propName !== "_asPath" && propName !== "active";
//   },
// })<StyledStackProps>(({ theme, _asPath, active }) => {
//   const style = {
//     flexGrow: 1,
//     width: "100%",
//     alignItems: "center",
//   };

//   if (_asPath) {
//     if (theme.palette.mode === "light") {
//       return {
//         ...style,
//         "& path": {
//           stroke: active ? theme.palette.common.white : theme.palette.common.black,
//         },

//         "& .searchOutlined path": {
//           color: active ? theme.palette.common.white : theme.palette.common.black,
//           stroke: "none",
//         },

//         [theme.breakpoints.down("sm")]: {
//           justifyContent: "flex-end",
//         },
//       };
//     } else {
//       return {
//         ...style,
//         "& path": {
//           stroke: theme.palette.common.white,
//         },

//         "& .searchOutlined path": {
//           color: theme.palette.common.white,
//           stroke: "none",
//         },

//         [theme.breakpoints.down("sm")]: {
//           justifyContent: "flex-end",
//         },
//       };
//     }
//   } else {
//     return {
//       ...style,

//       "& path": {
//         stroke: theme.palette.common.white,
//       },

//       "& .searchOutlined path": {
//         color: theme.palette.common.white,
//         stroke: "none",
//       },

//       [theme.breakpoints.down("sm")]: {
//         justifyContent: "flex-end",
//       },
//     };
//   }
// });

// const SubMenuSetting = ({ active }: Props) => {
//   const { asPath } = useRouter();
//   const { messages } = useIntl();

//   const _asPath = asPath.includes("/order") || asPath.includes("/cart") ? true : false;

//   return (
//     <Fade in={active}>
//       <WrapperMenu className="dayne">
//         <Grid container width="150px" spacing={2} alignItems="center">
//           <Grid item xs={6}>
//             <Title variant="p_xSmall">Theme</Title>
//           </Grid>
//           <Grid item xs={6}>
//             <DarkMode active={active} _asPath={_asPath} />
//           </Grid>
//           <Grid item xs={6}>
//             <Title variant="p_xSmall">{messages["header.languages"]}</Title>
//           </Grid>

//           <Grid item xs={6}>
//             <Language />
//           </Grid>
//         </Grid>
//       </WrapperMenu>
//     </Fade>
//   );
// };

// const WrapperMenu = styled(Box)(({ theme }) => {
//   return {
//     position: "absolute",
//     top: "100%",
//     right: "5%",
//     padding: "0.5rem",
//     borderRadius: "0.5rem",
//     // transform: "translateX(-50%)",

//     background: "rgba(38, 38, 38, 0.8)",
//     backdropFilter: "blur(5px)",
//     boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
//   };
// });

// const Title = styled(Typography)(({ theme }) => {
//   return {
//     fontWeight: 600,
//     color: theme.palette.common.white,
//   };
// });
export {};
