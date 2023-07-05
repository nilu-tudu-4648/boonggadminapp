import React from "react";

interface useDialogProps {}

const useDialog = () => {
  const [visible, setVisible] = React.useState<boolean>(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  return { showDialog, hideDialog, visible };
};

export default useDialog;
