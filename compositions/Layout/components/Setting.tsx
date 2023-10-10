// import { useCallback, useState } from "react";
// import { Collapse, Fade, Grid, Typography, styled } from "@mui/material";

// import useThemeMode from "@/hooks/useThemeMode";
// import { Box, SearchOutlined, SettingIcon, Stack } from "@/components";
// import DarkMode from "./DarkMode";
// import Language from "./Language";
// import { useRouter } from "next/router";

// interface SubMenuSettingProps {
//   active: boolean;
// }

// export default function Setting() {
//   const [active, setActive] = useState<boolean>(false);

//   const handleSetting = useCallback(() => {
//     setActive(!active);
//   }, [active]);

//   return (
//     <Wrapper>
//       <Stack direction="row" spacing={2}>
//         <SettingIcon onClick={handleSetting} />
//       </Stack>

//       <SubMenuSetting active={active} />
//     </Wrapper>
//   );
// }

// const Wrapper = styled(Box)(({ theme }) => {
//   const { mode } = useThemeMode();

//   return {
//     position: "relative",

//     "& path": {
//       stroke: theme.palette.common.white,
//     },
//   };
// });

// const SubMenuSetting = ({ active }: SubMenuSettingProps) => {
//   const { asPath } = useRouter();
//   const _asPath = asPath.includes("/order") || asPath.includes("/cart") ? true : false;

//   return (
//     <Fade in={active}>
//       <WrapperMenu>
//         <Grid container width="150px" spacing={2} alignItems="center">
//           <Grid item xs={6}>
//             <Title variant="p_xSmall">Theme</Title>
//           </Grid>
//           <Grid item xs={6}>
//             <DarkMode active={active} _asPath={_asPath} />
//           </Grid>
//           <Grid item xs={6}>
//             <Title variant="p_xSmall">Ngôn ngữ</Title>
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
//     top: "150%",
//     left: "-50%",
//     background: theme.palette.background.default,
//     padding: "0.5rem",
//     borderRadius: "0.5rem",
//     transform: "translateX(-50%)",
//   };
// });

// const Title = styled(Typography)(({ theme }) => {
//   return {
//     fontWeight: 600,
//   };
// });

// const WrapperSearch = styled(Box)(({ theme }) => {
//   return {
//     position: "absolute",
//     top: "100%",
//     left: 0,

//     background: theme.palette.background.default,
//   };
// });
export {};
