import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-input-interface',
  templateUrl: './input-interface.component.html',
  styleUrls: ['./input-interface.component.css']
})
export class InputInterfaceComponent implements OnInit {

  constructor(private toastrService: ToastrService) { }

  ngOnInit(): void {
  }

  showSuccess() {
    this.toastrService.success('Hello world!', 'Toastr fun!');
  }

}
