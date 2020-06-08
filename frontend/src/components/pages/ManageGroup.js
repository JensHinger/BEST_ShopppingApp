import React, { Component } from 'react';
import ExitGroupDialog from '../dialogs/ExitGroupDialog';
import RemoveGroupMemberDialog from '../dialogs/RemoveGroupMemberDialog';

class ManageGroup extends Component {

 render(){

    return(
        <div>

         <ExitGroupDialog>

         </ExitGroupDialog>

         <RemoveGroupMemberDialog>
             
         </RemoveGroupMemberDialog>
        </div>
    )

 }



}
export default ManageGroup;