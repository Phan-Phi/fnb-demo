// import { useEffect, useMemo } from "react";
// import { Fade, Typography, styled } from "@mui/material";

// import { useCategory, useFetch } from "@/hooks";
// import { transformUrl } from "@/libs";
// import { useRouter } from "next/router";
// import { Box, Stack } from "@/components";
// import { PAGES_API, TYPE_PARAMS } from "@/apis";

// interface Props {
//   active: boolean;
// }

// export default function SubMenuItem({ active }: Props) {
//   const { locale, push } = useRouter();
//   const { categoryData } = useCategory();

//   // const api = {
//   //   type: TYPE_PARAMS["product.ProductCategoryDetailPage"],
//   //   fields: "*",
//   //   locale,
//   // };

//   // const { data, changeKey } = useFetch(transformUrl(PAGES_API, api));

//   // useEffect(() => {
//   //   changeKey(
//   //     transformUrl(PAGES_API, {
//   //       ...api,
//   //       locale,
//   //     })
//   //   );
//   // }, [locale]);

//   const render = useMemo(() => {
//     if (categoryData == undefined) return null;

//     return categoryData.map((el, idx) => {
//       return (
//         <TextItemMenu
//           key={idx}
//           variant="p_large"
//           onClick={() => {
//             push(`/product?descendant_of=${el.id}`);
//           }}
//         >
//           {el.title}
//         </TextItemMenu>
//       );
//     });
//   }, [categoryData]);

//   return (
//     <Fade in={active}>
//       <SubMenu className="submenu">
//         <WrapperExpandSubMenu spacing={2}>{render}</WrapperExpandSubMenu>
//       </SubMenu>
//     </Fade>
//   );
// }

// const WrapperExpandSubMenu = styled(Stack)(({ theme }) => {
//   return {
//     width: "auto",
//     padding: "1rem 1rem",
//     position: "relative",
//     cursor: "pointer",
//   };
// });

// const SubMenu = styled(Box)(({ theme }) => {
//   return {
//     width: "max-content",
//     borderRadius: "4px",
//     position: "absolute",
//     top: "100%",
//     // transition: "all 0.5s  ease", borderRadius: "4px",
//     // transform: "rotate3d(1,0,0,-90deg)",
//     // display: "none",
//     // opacity: 0,
//     transformOrigin: "0 0 0",
//     background: "rgba(38, 38, 38, 0.8)",
//     backdropFilter: "blur(5px)",
//     boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
//   };
// });

// const TextItemMenu = styled(Typography)(({ theme }) => {
//   return {
//     display: "block",
//     textTransform: "capitalize",
//     transition: "all 0.4s",
//     lineHeight: "24px",
//     color: theme.palette.common.white,
//     "&:hover": {
//       color: theme.palette.primary.main,
//     },
//   };
// });

import React from "react";

export default function SubMenuItem() {
  return <div>SubMenuItem</div>;
}
