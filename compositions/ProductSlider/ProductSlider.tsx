import { isEmpty } from "lodash";
import { useMeasure } from "react-use";
import { BoxProps, Container, Grid, Grow, styled } from "@mui/material";
import { Fragment, useCallback, useEffect, useMemo, useState } from "react";

import { transformUrl } from "@/libs";
import { PAGES_END_POINT } from "@/__generated__";
import { useFetch, useIntl, useMedia, useParams } from "@/hooks";
import { Box, LoadingProductsSlider, Pagination, Stack } from "@/components";

import CardProductItem from "../CardProduct/CardProductItem";
import WrapperContent from "@/containers/Home/components/WrapperContent";

interface Props {
  title: string;
  option?: any;
}

interface WrapperProductItemProps extends BoxProps {
  heightBox: number;
}

export default function ProductSlider({ option, title }: Props) {
  const { isMdDown } = useMedia();
  const { messages } = useIntl();
  const [ref, { height }] = useMeasure<HTMLDivElement>();

  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const { params, setParams } = useParams({
    initState: option,
    excludeKeys: [
      "type",
      "locale",
      "fields",
      "limit",
      "offset",
      "is_exported",
      "descendant_of",
    ],
  });

  const { data, isLoading, changeKey, resData } = useFetch<any>(
    transformUrl(PAGES_END_POINT, params)
  );

  useEffect(() => {
    if (resData == undefined) return;

    setTotalPage(Math.ceil(resData?.meta.total_count / 10));
  }, [resData]);

  useEffect(() => {
    setParams({ ...option });
    setTotalPage(0);
    setCurrentPage(1);
  }, [option]);

  useEffect(() => {
    changeKey(transformUrl(PAGES_END_POINT, params));
  }, [params]);

  const handlePagination = useCallback(
    (event: React.SyntheticEvent, page: number) => {
      setCurrentPage(page);

      setParams({
        offset: (page - 1) * params.limit,
      });
    },
    [params.limit]
  );

  const renderItem = useMemo(() => {
    const LoadingComponent = (
      <Box>
        <LoadingProductsSlider isHomePage />
        <LoadingProductsSlider isHomePage />
      </Box>
    );

    let content: React.ReactNode = null;

    if (data == undefined) {
      content = LoadingComponent;
    } else if (isEmpty(data) && !isLoading) {
      content = <StyledCenter>{messages["brands.empty"]}</StyledCenter>;
    } else {
      if (isLoading) {
        content = LoadingComponent;
      } else {
        content = (
          <Grid
            container
            columns={isMdDown ? 12 : 10}
            spacing={2}
            className="gridProductItem"
          >
            {data.map((el, idx) => {
              return (
                <Grid item xs={4} md={2} key={idx} ref={ref}>
                  <Grow in={true} timeout={idx * 70 + 600}>
                    <Box>
                      <CardProductItem
                        isHomePage
                        title={el.title}
                        alt={el.title}
                        imageSrc={el.images[0].value || ""}
                        price={el.first_variant_price}
                        isExported={el.is_exported}
                        id={el.id}
                      />
                    </Box>
                  </Grow>
                </Grid>
              );
            })}
          </Grid>
        );
      }
    }

    return content;
  }, [data, isMdDown, isLoading]);

  if (resData?.meta.total_count == undefined) return;

  return (
    <Fragment>
      {resData?.meta.total_count > 0 && (
        <Container>
          <WrapperContent title={title}>
            <Wrapper>
              <WrapperProductItem heightBox={height}>{renderItem}</WrapperProductItem>

              <Pagination
                count={totalPage}
                page={currentPage}
                onchange={handlePagination}
              />
            </Wrapper>
          </WrapperContent>
        </Container>
      )}
    </Fragment>
  );
}

const Wrapper = styled(Box)(() => {
  return {
    "& .MuiPaginationItem-page, .MuiPaginationItem-ellipsis": {
      display: "none",
    },
  };
});

const WrapperProductItem = styled(Box, {
  shouldForwardProp: (propName) => {
    return propName !== "heightBox";
  },
})<WrapperProductItemProps>(({ heightBox }) => {
  return {
    marginBottom: "1.25rem",
    height: heightBox * 2 + 32,
    "& .gridProductItem": {
      // height: 900,
    },
  };
});

const StyledCenter = styled(Stack)(() => {
  return {
    gap: 20,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  };
});
