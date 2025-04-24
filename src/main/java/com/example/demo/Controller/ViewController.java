

package com.example.demo.Controller;
import com.example.demo.Model.Post;
import com.example.demo.Repo.PostRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.ui.Model;


@Controller
public class ViewController {

    @Autowired
    private PostRepo postRepo;

    @GetMapping("/posts")
    public String listPosts(Model model) {
       model.addAttribute("posts", postRepo.findAll());
        return "list-posts";
    }

    @GetMapping("/posts/new")
    public String newPostForm(Model model) {
        model.addAttribute("post", new Post());
        return "create-post";
    }

    @PostMapping("/posts/save")
    public String savePost(@ModelAttribute Post post) {
        postRepo.save(post);
        return "redirect:/posts";
    }

    @GetMapping("/posts/edit/{id}")
    public String editPostForm(@PathVariable int id, Model model) {
        model.addAttribute("post", postRepo.findById(id).orElseThrow());
        return "edit-post";
    }

    @PostMapping("/posts/update")
    public String updatePost(@ModelAttribute Post post) {
        postRepo.save(post);
        return "redirect:/posts";
    }

    @GetMapping("/posts/delete/{id}")
    public String deletePost(@PathVariable int id) {
        postRepo.deleteById(id);
        return "redirect:/posts";
    }
}
