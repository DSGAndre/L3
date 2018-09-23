#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>
#include <unistd.h>
#include "struct.h"

#define TEMPS_PAR_PRODUCTION 1
int capacite_max_entrepot();

void *activite_usine(void *pdata){
  /* production de voitures en continu toutes les 1 secondes */
  dataUE *pdataU = (dataUE *)(pdata);
  while(1){
    printf("Usine demande mutex");
    pthread_mutex_lock(pdataU->pmutex);
    printf("Usine obtient mutex");
    printf("Usine : \t");
    if(*(pdataU->pstock)<capacite_max_entrepot()){
      *(pdataU->pstock) ++;
      printf("Production d'une voiture.\n");
    }else{
      printf("Pas de production d'une voiture.\n");
    }
    pthread_mutex_unlock(pdataU->pmutex);
    sleep(TEMPS_PAR_PRODUCTION);
  }
}


int creation_usine(pthread_t *t, dataUE *pdata){
  /* Creation de l'usine */

  return pthread_create(t,
			NULL,
			activite_usine,
			pdata);
}
