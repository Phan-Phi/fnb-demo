import classNames from "classnames";
import { useRouter } from "next/router";
import { useDebounce } from "react-use";
import { Input, InputProps, Box, styled, BoxProps } from "@mui/material";
import { useTypewriter } from "react-simple-typewriter";

import { useSetting } from "@/hooks";
import { ROUTES } from "@/routes";
import React, {
  ChangeEvent,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { SearchOutlined } from "@/components";
import useThemeMode from "@/hooks/useThemeMode";

interface SearchInputProps extends Omit<InputProps, "onChange"> {
  onChange?: (value: string) => void;
  initSearch?: string;
  debounceTime?: number | undefined;
  isTypewriterEffect?: boolean;
  active?: boolean;
}

interface Props {
  active: boolean;
}

export default function Search({ active }: Props) {
  const ref = useRef<any>();

  return (
    <Wrapper active={active}>
      <InputSearch ref={ref} active={active} isTypewriterEffect />
    </Wrapper>
  );
}

const InputSearch = forwardRef<
  {
    resetValue: () => void;
  },
  SearchInputProps
>(function InputDemo(props: any, ref: any) {
  const setting = useSetting();

  const router = useRouter();
  const { locale } = router;

  const {
    initSearch,
    debounceTime = 500,
    onChange,
    isTypewriterEffect,
    active,
    _asPath,
    ...restProps
  } = props;

  const [search, setSearch] = useState(initSearch || "");

  const onValueChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, []);

  const onSearchKeywordHandler = useCallback(
    (keyword: string) => {
      return (e: React.BaseSyntheticEvent) => {
        e.preventDefault();

        if (keyword === "") return;

        const pathname = `/${ROUTES.search}?search=${keyword}&search_operator=or`;

        router.push(pathname, pathname, {
          locale,
        });

        setSearch("");
      };
    },
    [locale]
  );

  useDebounce(
    () => {
      onChange && onChange(search);
    },
    debounceTime,
    [search, debounceTime]
  );

  useEffect(() => {
    ref.current.placeholder = "Tìm kiếm sản phẩm...";
  }, []);

  return (
    <Box component="form" onSubmit={onSearchKeywordHandler(search)} width="100%">
      <Input
        inputRef={ref as any}
        className={classNames([
          "search-input",
          {
            // isBlack: !!y,
          },
        ])}
        placeholder="Tìm kiếm sản phẩm..."
        value={search}
        startAdornment={<StyledSearchOutlined onClick={onSearchKeywordHandler(search)} />}
        onChange={onValueChange}
        {...restProps}
      />
    </Box>
  );
});

const StyledSearchOutlined = styled(SearchOutlined)(({ theme }) => {
  return {
    color: theme.palette.text.primary,
  };
});

interface WrapperProps extends BoxProps {
  active: boolean;
}

const Wrapper = styled(Box, {
  shouldForwardProp: (propName) => propName !== "active",
})<WrapperProps>(({ theme, active }) => {
  return {
    // width: "60%",
    "& .MuiInputBase-root": {
      "& .MuiInputBase-input": {
        color: theme.palette.mode === "light" ? "black !important" : "white !important",
      },
    },
  };
});

//   useImperativeHandle(
//     ref,
//     () => {
//       return {
//         resetValue: () => {
//           setSearch("");
//         },
//       };
//     },
//     []
//   );
