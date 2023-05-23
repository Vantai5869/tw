import React from "react";
import MultiSelect from "../../../../componets/MultiSelect";
import SelectPopUp from "../../../../componets/SelectPopup";

interface Props {
  data: any;
  title: string;
  isShow: boolean;
  value: any;
  setShow: (e: boolean) => void;
  onSelect: (e: number[]) => void;
}

const SelectYear: React.FC<Props> = ({
  data,
  title,
  isShow,
  value,
  setShow,
  onSelect,
}) => {
  return (
    <SelectPopUp
      isVisible={isShow}
      title={title}
      data={data}
      checkeds={[value]}
      onClose={() => setShow(false)}
      onChange={(e) => onSelect(e)}
      multi={false}
    />
  );
};
export default SelectYear;
