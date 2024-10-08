import { Dispatch, SetStateAction } from 'react';
import { Button } from '@twilio-paste/core/button';
import { DeleteIcon } from '@twilio-paste/icons/esm/DeleteIcon';

import { ShortcutsObject } from '../../types/types';
import { writeToLocalStorage } from '../../utils/LocalStorageUtil';
import { getCurrentShortcuts, deleteShortcut } from '../../utils/KeyboardShortcutsUtil';
import { shortcutsConfig } from '../../utils/constants';

interface DeleteButtonProps {
  actionName: string;
  shortcutKey: string;
  shortcuts: ShortcutsObject[];
  setShortcuts: Dispatch<SetStateAction<ShortcutsObject[]>>;
  toasterDeleteNotification: (actionName: string) => void;
}

const DeleteButton = ({
  shortcutKey,
  actionName,
  shortcuts,
  setShortcuts,
  toasterDeleteNotification,
}: DeleteButtonProps): JSX.Element => {
  const deleteShortcutHandler = (): void => {
    const updatedShortcuts = shortcuts.filter((shortcut) => shortcut.key !== shortcutKey);
    setShortcuts(updatedShortcuts);

    deleteShortcut(shortcutKey);
    toasterDeleteNotification(actionName);
    writeToLocalStorage(shortcutsConfig, getCurrentShortcuts());
  };

  return (
    <Button variant="destructive_icon" size="reset" onClick={deleteShortcutHandler}>
      <DeleteIcon decorative={false} title="Delete" />
    </Button>
  );
};

export default DeleteButton;
