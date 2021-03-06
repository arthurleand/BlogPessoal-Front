import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.css']
})
export class UsuarioEditComponent implements OnInit {

  usuario: Usuario = new Usuario
  idUsuario:number
  tipoDeUsuario: string;
  confirmarSenha: string;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(){
    window.scroll(0,0)
    if (environment.token == '') {
      
      this.router.navigate(['/login'])
    }
    this.authService.refreshToken()
    this.idUsuario = this.route.snapshot.params['id']
    this.findByIdUsuario(this.idUsuario)
  }
  confirmeSenha(event: any){
    this.confirmarSenha = event.target.value
  }

  tipoUsuario(event: any){
    this.tipoDeUsuario = event.target.value
  }
  atualizar(){
    this.usuario.tipo = this.tipoDeUsuario

    if (this.usuario.senha != this.confirmarSenha) {
      alert("As senhas estão diferentes")
    } else{
      this.authService.atualizar(this.usuario).subscribe((resp: Usuario)=>{
        this.usuario = resp
        alert("Usuário atualizado, faça login novamente!!")
        environment.token=''
        environment.nome=''
        environment.id=0
        environment.foto=''
        this.router.navigate(['/login'])
      })
    }
  }
  
  findByIdUsuario(id: number){
    this.authService.getByIdUsuario(id).subscribe((resp: Usuario)=>{
      this.usuario = resp
    })
  }

}
