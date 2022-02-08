import { createClient, Provider, SupabaseClient, User } from '@supabase/supabase-js';

// import { keys } from 'rxjs';
import { keys } from './keys.service';

const supabase: SupabaseClient = createClient(keys.SUPABASE_URL, keys.SUPABASE_KEY);

export default class SupabaseDataService {
	static myInstance:any = null;

	static getInstance() {
		if (this.myInstance == null) {
		  this.myInstance = new this();
		}
		return this.myInstance;
	  }

  // constructor() {}
  
  
  public async getProfile(id: string) {
    if (id) {
      const { data, error } = 
      await supabase.from('profile')
      .select('*')
      .eq('id', id)
      .limit(1)
      .single(); // return a single object (not an array)
      return { data, error };  
    } else {
      console.log('#### getProfile: no id');
      return { data: {}, error: null };  
    }
  } 

  public async saveProfile(profile: any) {
    const { data, error } = 
    await supabase.from('profile')
    .upsert(profile);
    return { data, error };
  }

  public async getPeople() {
    const { data, error } = 
    await supabase.from('persons')
    .select('*');
    return { data, error };
  }
  public async getOrgs(selectedCategories: string[]) {
    const { data, error } = 
    await supabase.from('orgs')
    .select('*')
    .containedBy('categories', selectedCategories);
    return { data, error };
  }

  public async getPerson(id: string) {
    const { data, error } = 
    await supabase.from('persons')
    .select('*')
    .eq('id', id)
    .limit(1)
    .single();
    return { data, error };
  }

  public async getOrg(id: string) {
    const { data, error } = 
    await supabase.from('orgs')
    .select('*')
    .eq('id', id)
    .limit(1)
    .single();
    return { data, error };
  }

  public async savePerson(person: any) {
    person.updated_at = 'NOW()';
    const { data, error } = 
    await supabase.from('persons')
    .upsert(person);
    return { data, error };
  }
  public async saveOrg(org: any) {
    org.updated_at = 'NOW()';
    const { data, error } = 
    await supabase.from('orgs')
    .upsert(org);
    return { data, error };
  }
  public async deletePerson(id: string) {
    const { data, error } = 
    await supabase.from('persons')
    .delete({ returning: 'minimal'})
    .eq('id', id);
    return { data, error };
  }
  public async deleteOrg(id: string) {
    const { data, error } = 
    await supabase.from('orgs')
    .delete({ returning: 'minimal'})
    .eq('id', id);
    return { data, error };
  }


  // generic sample functions
  public async getRow(table: string, whereColumn: string, whereValue: any, columnList: string = '*') {
    const { data, error } = 
    await supabase.from(table)
    .select(columnList)
    .eq(whereColumn, whereValue)
    .limit(1)
    .single(); // return a single object (not an array)
    return { data, error };
  }
  public async getRows(table: string, whereColumn: string, whereValue: any, columnList: string = '*', offset: number = 0, limit: number = 100) {
    const { data, error } = 
    await supabase.from(table)
    .select(columnList)
    .eq(whereColumn, whereValue)
    .range(offset, offset + limit)
    return { data, error };
  }


}
