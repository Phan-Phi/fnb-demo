// import { useRouter } from "next/router";
// import { useMeasure } from "react-use";
// import { Typography, styled, useTheme } from "@mui/material";

// import { useIntl, useMedia } from "@/hooks";
// import { NewsPage } from "@/interfaces";
// import { Box, Ratio, Image, Stack, ArrowRightIcon } from "@/components";
// import {
//   CARD_NEWS_ISHOME_RATIO_MOBILE,
//   CARD_NEWS_ISHOME_RATIO_TABLET,
//   CARD_NEWS_RATIO_DESKTOP,
// } from "@/constants";

// interface WrapperProps {
//   heightHover: number;
// }

// interface Props {
//   data: NewsPage;
// }

// export default function CardIsHomePage({ data }: Props) {
//   const { isMdUp, isSmDown } = useMedia();
//   const [ref, { height }] = useMeasure<HTMLDivElement>();

//   const { thumbnail, title, content, description, id } = data;

//   return (
//     <Wrapper heightHover={height}>
//       <Ratio
//         ratio={
//           isSmDown
//             ? CARD_NEWS_ISHOME_RATIO_MOBILE
//             : isMdUp
//             ? CARD_NEWS_RATIO_DESKTOP
//             : CARD_NEWS_ISHOME_RATIO_TABLET
//         }
//       >
//         {thumbnail && (
//           <Image
//             src={thumbnail}
//             alt=""
//             style={{ borderRadius: "0.5rem", objectFit: "cover" }}
//           />
//         )}
//         <Overlay className="overlay"></Overlay>

//         <WrapperContent ref={ref} className="content">
//           <Content id={id} content={description} />
//         </WrapperContent>

//         <Box sx={{ position: "absolute", bottom: "1rem", padding: "0 1rem" }}>
//           <Title variant="h4">{title}</Title>
//           <Box className="content2" sx={{ transition: "all .4s ease" }}></Box>
//         </Box>
//       </Ratio>
//     </Wrapper>
//   );
// }

// const Wrapper = styled(Box, {
//   shouldForwardProp: (propName) => {
//     return propName !== "heightHover";
//   },
// })<WrapperProps>(({ theme, heightHover }) => {
//   return {
//     width: "100%",
//     overflow: "hidden",
//     transition: "all .4s ease",
//     // cursor: "pointer",

//     "&:hover .overlay": {
//       opacity: ".6",
//     },

//     "&:hover .content2": {
//       paddingTop: `${heightHover}px`,
//     },

//     "&:hover .content": {
//       opacity: 1,
//     },

//     [theme.breakpoints.down("md")]: {
//       "& img": {
//         objectFit: "cover",
//       },
//     },
//   };
// });

// const Overlay = styled(Box)(({ theme }) => {
//   return {
//     position: "absolute",
//     top: "0",
//     bottom: "0",
//     left: "0",
//     right: "0",
//     height: "100%",
//     width: "100%",
//     opacity: ".3",
//     transition: ".4s ease",
//     backgroundColor: "#242424",
//     borderRadius: "0.5rem",
//   };
// });

// const Title = styled(Typography)(({ theme }) => {
//   return {
//     display: "-webkit-box",
//     WebkitLineClamp: 2,
//     overflow: "hidden",
//     WebkitBoxOrient: "vertical",
//     minHeight: 36 * 2,
//     fontWeight: 700,
//     marginBottom: "0.5rem",
//     color: theme.palette.common.white,

//     [theme.breakpoints.down("sm")]: {
//       ...theme.typography.h5,
//       fontWeight: 700,
//       minHeight: 32 * 2,
//     },
//   };
// });

// interface ContentProps {
//   id: number;
//   content: string;
// }

// const Content = ({ id, content }: ContentProps) => {
//   const { push } = useRouter();
//   const { messages } = useIntl();
//   const theme = useTheme();

//   return (
//     <Box>
//       <Text variant="p_medium">{content}</Text>
//       <SeeMore direction="row" marginTop={1} spacing={1.5}>
//         <SubText
//           variant="p_medium"
//           onClick={() => {
//             push(`/news/${id}`);
//           }}
//         >
//           {messages["news.viewMore"]}
//         </SubText>

//         <Box
//           onClick={() => {
//             push(`/news/${id}`);
//           }}
//         >
//           <ArrowRightIcon />
//         </Box>
//       </SeeMore>
//     </Box>
//   );
// };

// const Text = styled(Typography)(({ theme }) => {
//   return {
//     display: "-webkit-box",
//     WebkitLineClamp: 3,
//     overflow: "hidden",
//     WebkitBoxOrient: "vertical",
//     minHeight: 36 * 2,
//     fontWeight: 700,
//     color: theme.palette.common.white,

//     // [theme.breakpoints.down("sm")]: {
//     //   ...theme.typography.p_small,
//     //   fontWeight: 700,
//     // },
//   };
// });

// const SubText = styled(Typography)(({ theme }) => {
//   return {
//     fontWeight: 700,
//     color: theme.palette.common.white,

//     // [theme.breakpoints.down("sm")]: {
//     //   ...theme.typography.p_small,
//     //   fontWeight: 700,
//     // },
//   };
// });

// const SeeMore = styled(Stack)(({ theme }) => {
//   return {
//     cursor: "pointer",
//   };
// });

// const WrapperContent = styled(Box)(({ theme }) => {
//   return {
//     position: "absolute",
//     bottom: "1rem",
//     padding: "0 1rem",
//     zIndex: 3,
//     opacity: 0,
//     transition: "all .4s ease",
//   };
// });
import React from "react";

export default function CardIsHomePage() {
  return <div>CardIsHomePage</div>;
}
