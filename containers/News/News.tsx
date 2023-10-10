import { get, isEmpty } from "lodash";
import { useRouter } from "next/router";
import { Container, Grid, Tab, Typography, styled } from "@mui/material";
import { Fragment, useCallback, useEffect, useMemo, useState } from "react";

import { PAGES_API } from "@/apis";
import { CardNew } from "@/compositions";
import { getSeoObject, transformUrl } from "@/libs";
import { IPage, responseSchema } from "@/interfaces";
import { PAGE_TYPES } from "@/__generated__/END_POINT";
import { useFetch, useIntl, useMedia, useParams } from "@/hooks";
import { Box, LoadingProducts, Pagination, SEO, TabPanel, Tabs } from "@/components";
import Footer from "@/compositions/Layout/Footer";

const customTab = {
  id: -1,
  title: "Tất Cả",
  key: "all",
};

export type NewsPageProps = IPage<
  [responseSchema<any>, responseSchema<any>, responseSchema<any>]
>;

export default function News(props: NewsPageProps) {
  const { locale, query } = useRouter();
  const { messages } = useIntl();
  const { isMdDown } = useMedia();

  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentTab, setCurrentTab] = useState<number>(-1);

  const dataListing = get(props, "initData[0].items[0]");
  const dataItem = get(props, "initData[1].items");
  const dataCategory = get(props, "initData[2].items");

  const { params, setParams } = useParams({
    initState: {
      limit: 12,
      offset: 0,
      fields: "*",
      locale: locale,
      type: PAGE_TYPES.NEWS_NEWSPAGE,
    },
    excludeKeys: ["type", "locale", "fields", "limit", "offset"],
  });

  const { title, meta } = dataListing;

  const { data, resData, changeKey, isDone, isLoading } = useFetch(
    transformUrl(PAGES_API, params)
  );

  useEffect(() => {
    if (resData == undefined) return;
    const totalCount = resData.meta.total_count;

    if (isMdDown) {
      setTotalPage(Math.ceil(totalCount / 6));
      setParams({
        limit: 6,
      });
    } else {
      setTotalPage(Math.ceil(totalCount / 12));
      setParams({
        limit: 12,
      });
    }
  }, [resData, isMdDown]);

  useEffect(() => {
    changeKey(transformUrl(PAGES_API, params));
  }, [params.offset, params.limit]);

  useEffect(() => {
    changeKey(transformUrl(PAGES_API, params));
  }, [currentTab]);

  const onChangeTabHandler = useCallback(
    (e: React.SyntheticEvent, value: number): void => {
      setCurrentTab(value);
      setCurrentPage(1);
      if (value === -1) {
        setParams({
          child_of: undefined,
          offset: undefined,
        });
      } else {
        setParams({
          child_of: value,
          offset: undefined,
        });
      }
    },
    []
  );

  const onChangePage = useCallback(
    (e: React.SyntheticEvent, page: number): void => {
      setCurrentPage(page);
      if (currentPage === page) return;

      setParams({
        offset: (page - 1) * params.limit,
      });
    },
    [currentPage, params]
  );

  const renderTabProduct = useMemo(() => {
    if (dataCategory === undefined) return;

    const mergeTabList = [customTab, ...dataCategory];

    return (
      <Tabs value={currentTab} onChange={onChangeTabHandler}>
        {mergeTabList.map((el: any, idx: number) => {
          return (
            <Tab
              label={
                <Typography>{idx === 0 ? messages["tab.all"] : el.title}</Typography>
              }
              key={idx}
              value={el.id}
              disableRipple
            />
          );
        })}
      </Tabs>
    );
  }, [currentTab, dataCategory]);

  const renderCardItem = useMemo(() => {
    const LoadingComponent = (
      <>
        <LoadingProducts />
        <LoadingProducts />
      </>
    );

    let content: React.ReactNode = null;

    if (data == undefined) {
      content = LoadingComponent;
    } else if (isEmpty(data) && !isLoading) {
      content = (
        <Grid item xs={12}>
          {/* <Typography textAlign="center">{messages["noProduct"] as string}</Typography> */}
        </Grid>
      );
    } else {
      if (isLoading) {
        content = LoadingComponent;
      } else {
        content = (
          <Fragment>
            {data.map((item: any) => {
              return (
                <Grid item xs={12} sm={12} md={4} key={item.id}>
                  <CardNew data={item} />
                </Grid>
              );
            })}
          </Fragment>
        );
      }
    }

    return (
      <TabPanel value={currentTab} index={currentTab}>
        <Grid container spacing={2}>
          {content}
        </Grid>
      </TabPanel>
    );
  }, [currentTab, data, isLoading]);

  return (
    <Container>
      <SEO {...getSeoObject(meta)} />
      <Title>{messages["news.news&event"]}</Title>

      {renderTabProduct}

      <Wrapper>{renderCardItem}</Wrapper>

      {!isEmpty(data) && (
        <Pagination page={currentPage} count={totalPage} onchange={onChangePage} />
      )}
    </Container>
  );
}

const Wrapper = styled(Box)(() => {
  return {
    padding: "1.25rem 0",
  };
});

const Title = styled(Typography)(({ theme }) => {
  return {
    ...theme.typography.SVNPoppins,
    fontSize: "24px",
    fontWeight: 700,
    marginBottom: "1.25rem",
  };
});
