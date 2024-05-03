import { Component, OnInit } from '@angular/core';
import { ProductoService } from './producto.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Producto } from './producto';
import Swal from 'sweetalert2';
import { Categoria } from '../categorias/categoria';
import { CategoriaService } from '../categorias/categoria.service';
import { Marca } from '../marcas/marca';
import { Medida } from '../medidas/medida';
import { MarcaService } from '../marcas/marca.service';
import { MedidaService } from '../medidas/medida.service';
import { NgFor, NgIf } from '@angular/common';
import { NgForm, FormsModule } from '@angular/forms';

@Component({
    selector: 'app-form-producto',
    templateUrl: './form-producto.component.html',
    standalone: true,
    imports: [FormsModule, NgFor, NgIf, RouterLink]
})
export class FormProductoComponent implements OnInit {

  public producto: Producto = new Producto();
  categorias: Categoria[];
  marcas: Marca[];
  medidas: Medida[];

  

  file: File;

  constructor(private productoService: ProductoService, private router: Router,
    private activaRoute: ActivatedRoute, private categoriaService: CategoriaService,
    private marcaService: MarcaService, private medidasService: MedidaService) { }

  ngOnInit(): void {
    this.cargarProducto();
    this.categoriaService.getCategorias().subscribe(categoria =>
      this.categorias = categoria
    );
    this.marcaService.getMarcas().subscribe(marcas =>
      this.marcas = marcas
    );
    this.medidasService.getMedidas().subscribe(med =>
      this.medidas = med
    );
  }

  submitForm() {

    this.productoService.create2(this.producto, this.file).subscribe(
      (producto) => {
        this.router.navigate(['/productos']);
        Swal.fire('Producto creado', `Producto ${producto.nombre}`, 'success')
      }
    )
  }

  cargarProducto(): void {
    this.activaRoute.params.subscribe((params) => {
      let id = params['id'];
      if (id) {
        this.productoService.getProducto(id).subscribe(producto =>
          this.producto = producto
        )
      }
    })
  }

  public create(): void {
    this.productoService.create(this.producto).subscribe(
      (producto) => {
        this.router.navigate(['/productos']),
          Swal.fire('Producto creado', `Producto ${producto.nombre}`, 'success')
      }
    )
  }

  public create2(): void {
   
    this.productoService.create2(this.producto, this.file).subscribe(
      (producto) => {
        this.router.navigate(['/productos']);
        Swal.fire('Producto creado', `Producto ${producto.nombre}`, 'success')
      }
    )   
  }

  onFileSelected(event: any):void {
     this.file = (event.target as HTMLInputElement).files[0];
      if(this.file.type.indexOf('image') <0){
        Swal.fire('Error el acrchivo debe ser una imagen','Puto','warning')
      }
      
    }

  public update(): void {
    this.productoService.updateProducto(this.producto).subscribe(
      (producto) => {
        this.router.navigate(['/productos']),
          Swal.fire(`Producto actualizado `, `Producto ${producto.nombre}`, 'success')
      }
    )
  }

  public update2(): void {
    this.productoService.updateProducto2(this.producto, this.file).subscribe(
      (producto) => {
        this.router.navigate(['/productos']),
          Swal.fire(`Producto actualizado `, `Medida ${producto.nombre}`, 'success')
      }
    )
  }

  comparar(c1: any, c2: any): boolean {
    if (c1 === undefined && c2 === undefined) {
      return true;
    }
    return c1 == null || c2 == null ? false : c1.id === c2.id;
  }


}
