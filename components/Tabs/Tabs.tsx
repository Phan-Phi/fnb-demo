import { styled, Tabs as MuiTabs, TabsProps as MuiTabsProps } from "@mui/material";

type Mode = "light" | "dark";

interface StyledMuiTabsProps extends MuiTabsProps {
  mode?: Mode;
}

interface TabsProps<T> {
  value: T;
  children: React.ReactNode;
  // onChange: (event: React.SyntheticEvent, newValue: T) => void;
  onChange: any;
}

type DefaultTabsProps<T> = StyledMuiTabsProps & TabsProps<T>;

export default function Tabs<T>(props: DefaultTabsProps<T>) {
  const { mode = "light", children, value, onChange, ...restProps } = props;
  return (
    <StyledMuiTabs value={value} onChange={onChange} mode={mode} {...restProps}>
      {children}
    </StyledMuiTabs>
  );
}

const StyledMuiTabs = styled(MuiTabs, {
  shouldForwardProp: (propName) => propName !== "mode",
})<StyledMuiTabsProps>(({ theme, mode }) => {
  return {
    "& .MuiTabs-flexContainer": {
      justifyContent: "flex-start",
      flexDirection: "column",
    },

    "& .MuiTabs-indicator": {
      // display: "none !important",
    },
  };
});
