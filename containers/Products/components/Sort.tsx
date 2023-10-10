import { useRouter } from "next/router";
import { useClickAway } from "react-use";
import { styled, Box, Stack, Typography, Grow } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { useIntl, useToggle } from "@/hooks";
import { PSEUDO_STATE } from "@/configuration";
import { FILTER_BOX_SHADOW } from "@/constants";
import { ChevronDownIcon, TickIcon } from "@/components";

const LIST_SORT = [
  {
    id: 0,
    name: "Mặc định",
    key: "default",
  },
  {
    id: 1,
    name: "Giá tăng dần",
    key: "asc",
  },
  {
    id: 2,
    name: "Giá giảm dần",
    key: "desc",
  },
];

type SortProps = {
  setParams: (newParams: object) => void;
};

export default function Sort({ setParams }: SortProps) {
  const router = useRouter();
  const { messages } = useIntl();
  const [nameOfSort, setNameOfSort] = useState("");
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [currentKey, setCurrentKey] = useState("default");
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { on: isOpenFilter, toggleOn: openFilter, toggleOff: closeFilter } = useToggle();

  useClickAway(wrapperRef, () => {
    closeFilter();
  });

  useEffect(() => {
    setParams({
      order: undefined,
    });
    setCurrentIndex(-1);
    setNameOfSort("");
  }, [router.query.id]);

  const handlerSort = useCallback(
    (name: string, index: number, key: string) => () => {
      setCurrentKey(key);
      if (currentKey === key) {
        closeFilter();
        return;
      }

      if (key === "default") {
        setParams({
          order: undefined,
        });
        setCurrentIndex(-1);
        setNameOfSort("");
      } else {
        if (key === "asc") {
          setParams({
            order: "first_variant_price",
          });
        }

        if (key === "desc") {
          setParams({
            order: "-first_variant_price",
          });
        }

        setCurrentIndex(index);
        setNameOfSort(key);
      }

      closeFilter();
    },
    [currentKey]
  );

  const renderSort = useMemo(() => {
    return LIST_SORT.map((item, index) => {
      return (
        <StyledWrapperText key={index} onClick={handlerSort(item.name, index, item.key)}>
          <StyledText>{messages[`sort.${item.key}`]}</StyledText>

          {index === currentIndex && <StyledTickIcon />}
        </StyledWrapperText>
      );
    });
  }, [currentIndex]);

  return (
    <StyledWrapper className="filter-sort" ref={wrapperRef}>
      <StyledStack onClick={openFilter}>
        <StyledTitle name={nameOfSort}>
          {nameOfSort
            ? `${messages["sort"]}: ${messages[`sort.${nameOfSort}`]}`
            : messages["sort"]}
        </StyledTitle>

        <ChevronDownIcon />
      </StyledStack>

      <Box>
        <Grow in={isOpenFilter}>
          <StyledDropDown>{renderSort}</StyledDropDown>
        </Grow>
      </Box>
    </StyledWrapper>
  );
}

const StyledWrapper = styled(Box)(() => {
  return {
    cursor: "pointer",
    position: "relative",
  };
});

const StyledTickIcon = styled(TickIcon)(({ theme }) => {
  return {
    stroke: theme.palette.common.black,
  };
});

const StyledStack = styled(Stack)(() => {
  return {
    gap: 4,
    flexDirection: "row",
  };
});

const StyledTitle = styled(Typography, {
  shouldForwardProp: (propName) => propName !== "name",
})<{ name: string }>(({ theme, name }) => {
  return {
    ...theme.typography.p_medium,
    textTransform: name ? "none" : "capitalize",
  };
});

const StyledText = styled(Typography)(({ theme }) => {
  return {
    ...theme.typography.p_small,
    cursor: "pointer",
    [PSEUDO_STATE.hover]: {
      opacity: 0.7,
    },
  };
});

const StyledDropDown = styled(Box)(({ theme }) => {
  return {
    width: 160,
    padding: 16,
    borderRadius: 4,
    boxShadow: FILTER_BOX_SHADOW,
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.skeleton.main
        : theme.palette.common.white,

    gap: 8,
    display: "flex",
    flexDirection: "column",

    top: 30,
    right: 0,
    zIndex: 99,
    position: "absolute",
  };
});

const StyledWrapperText = styled(Stack)(() => {
  return {
    gap: 8,
    flexDirection: "row",
    alignItems: "baseline",
  };
});
