import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { CursosService } from '../../../services/cursos.service';
import { FormControl, FormsModule} from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-filter-cursos',
  templateUrl: './filter-cursos.component.html',
  styleUrls: ['./filter-cursos.component.scss']
})
export class FilterCursosComponent implements OnInit {

  content:any;
  inf:any;

  @Input() deviceXs: boolean;
  @Output('search') searchEmitter = new EventEmitter<String>();


  constructor(public serCursos: CursosService) { }

  ngOnInit(){
    this.search.valueChanges.pipe(debounceTime(300)).subscribe(value => this.searchEmitter.emit(value))
  }

  search = new FormControl('')

  handleSearch(value: String){
    this.inf = value;
    console.log(value);

  }

  filtro_valor = ''

  newArray
  searchThis(data) {
    this.content = this.newArray
    console.log(data)
    if (data) {
      this.content = this.serCursos.busquedaCurso(function (ele, i, array) {
        let arrayelement = ele.name.toLowerCase()
        return arrayelement.includes(data)
      });
    }
    else {
      console.log(this.content)
    }
    console.log(this.content)
  }
}
