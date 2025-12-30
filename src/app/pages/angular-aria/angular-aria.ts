import { Listbox, Option } from '@angular/aria/listbox';
import { Menu, MenuItem, MenuTrigger } from '@angular/aria/menu';
import { Tree, TreeItem, TreeItemGroup } from '@angular/aria/tree';
import { NgTemplateOutlet } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-angular-aria',
  imports: [
    Menu,
    MenuItem,
    MenuTrigger,
    Listbox,
    Option,
    Tree,
    TreeItem,
    TreeItemGroup,
    NgTemplateOutlet
  ],
  templateUrl: './angular-aria.html',
  styleUrl: './angular-aria.css',
})
export class AngularAria {
  // Data for Listbox
  roles = [
    { id: 'admin', name: 'Administrator' },
    { id: 'editor', name: 'Content Editor' },
    { id: 'viewer', name: 'Viewer' },
    { id: 'guest', name: 'Guest' },
  ];
  selectedRoles = signal(['viewer']);

  // Data for Tree
  fileSystemData = [
    {
      name: 'src',
      children: [
        { name: 'app', children: [{ name: 'app.component.ts' }, { name: 'app.config.ts' }] },
        { name: 'assets', children: [{ name: 'logo.png' }] },
        { name: 'main.ts' },
      ],
    },
    {
      name: 'angular.json',
    },
    {
      name: 'package.json',
    },
  ];
}
