export {}
declare global {
    interface ProfileProps {
        userId: number;
        userRole: string;
        user: {
          username: string;
          email: string;
          password: string
          role: string;
          imgUrl: string
          coverUrl: string
          bio: string
          createdAt: string;
        }
        products: [{
          name: string;
          description: string;
          price: number;
          stock: number;
          imageUrl: string;
          arr : string[];
          setArray:(arr:string[]) => void;
        }]
        state: boolean;
        file: File;
        setFile: (file: File) => void;
        change: boolean;
        setChange: (change: boolean) => void;
        setUpdated: (updated: boolean) => void;
        updated: boolean;
        changeProfile: (id: number) => void;
        changeCover: (id: number) => void;
        handleLogout: (id: number) => void;
        setProducts:(products:string[])=>void;
        id: number;
        msg : string;
      }
      interface AccProps{
        show:boolean;
        hide:boolean;
        name:string;
        bio:string;
        showing:boolean;
        setShow:(show:boolean) => void;
        setHide:(hide:boolean) => void;
        setName:(name:string) => void;
        setBio:(bio:string) => void;
        setShowing:(show:boolean) => void;
        handleLogout: (id: number) => void;
      }
      
      
}

