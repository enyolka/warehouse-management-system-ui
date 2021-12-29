import * as React from "react";
import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import styles from "./moveProductForm.module.css";
import { StoreContext } from "../../redux/store/StoreProvider";
import { LogisticUnitModel } from "../../api/apiModel";
import { useMemo } from "react";
import MoveToMain from "./moveToMain";
import MoveToRelease from "./moveToRelease";

type Props = {
  routes: number[];
  setRoutes: (arr: number[]) => void;
  routesString: string;
  setRoutesString: (value: string) => void;
};

export function MoveProductForm({
  routes,
  setRoutes,
  routesString,
  setRoutesString,
}: Props): React.ReactElement {
  const { logisticUnitsState, productsState } = React.useContext(StoreContext);
  const [currentType, setCurrentType] = React.useState<"ACCEPTED" | "IN_STOCK">(
    "ACCEPTED"
  );

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newCurrentType: "ACCEPTED" | "IN_STOCK"
  ) => {
    setCurrentType(newCurrentType);
  };

  const unitsOptions: LogisticUnitModel[] = useMemo(() => {
    return logisticUnitsState.data.filter(
      (option: LogisticUnitModel) => option.products[0]?.status === currentType
    );
  }, [logisticUnitsState, currentType, productsState]);

  return (
    <Box>
      <ToggleButtonGroup
        className={styles.toggle}
        color="primary"
        value={currentType}
        exclusive
        onChange={handleChange}
      >
        <ToggleButton value="ACCEPTED">To Main</ToggleButton>
        <ToggleButton value="IN_STOCK">To Shipment</ToggleButton>
      </ToggleButtonGroup>
      {currentType === "ACCEPTED" ? (
        <MoveToMain options={unitsOptions} />
      ) : (
        <MoveToRelease
          options={unitsOptions}
          routes={routes}
          setRoutes={setRoutes}
          routesString={routesString}
          setRoutesString={setRoutesString}
        />
      )}
    </Box>
  );
}

export default MoveProductForm;
