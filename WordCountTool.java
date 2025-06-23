import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.io.*;

public class WordCountTool {
    public static void main(String[] args) {
        // Set a modern look and feel
        try {
            UIManager.setLookAndFeel(UIManager.getSystemLookAndFeelClassName());
        } catch (Exception ignored) {}

        JFrame frame = new JFrame("Word Count Tool");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setSize(600, 500);
        frame.setLocationRelativeTo(null);
        frame.setLayout(new BorderLayout(0, 0));

        // Title
        JLabel titleLabel = new JLabel("Word Count Tool", SwingConstants.CENTER);
        titleLabel.setFont(new Font("Segoe UI", Font.BOLD, 28));
        titleLabel.setBorder(BorderFactory.createEmptyBorder(20, 0, 10, 0));
        frame.add(titleLabel, BorderLayout.NORTH);

        // Text area
        JTextArea textArea = new JTextArea();
        textArea.setFont(new Font("Segoe UI", Font.PLAIN, 18));
        textArea.setLineWrap(true);
        textArea.setWrapStyleWord(true);
        JScrollPane scrollPane = new JScrollPane(textArea);
        scrollPane.setBorder(BorderFactory.createEmptyBorder(10, 20, 10, 20));
        frame.add(scrollPane, BorderLayout.CENTER);

        // Bottom panel for buttons and word count
        JPanel bottomPanel = new JPanel();
        bottomPanel.setLayout(new BorderLayout());
        bottomPanel.setBorder(BorderFactory.createEmptyBorder(10, 20, 20, 20));
        bottomPanel.setBackground(Color.WHITE);

        // Buttons panel
        JPanel buttonPanel = new JPanel();
        buttonPanel.setLayout(new FlowLayout(FlowLayout.LEFT, 15, 0));
        buttonPanel.setOpaque(false);

        JButton openButton = new JButton("Open File");
        openButton.setFont(new Font("Segoe UI", Font.PLAIN, 16));
        JButton countButton = new JButton("Count Words");
        countButton.setFont(new Font("Segoe UI", Font.PLAIN, 16));
        buttonPanel.add(openButton);
        buttonPanel.add(countButton);

        // Word count label
        JLabel resultLabel = new JLabel("Word Count: 0");
        resultLabel.setFont(new Font("Segoe UI", Font.BOLD, 20));
        resultLabel.setForeground(new Color(0, 102, 204));
        resultLabel.setHorizontalAlignment(SwingConstants.RIGHT);

        bottomPanel.add(buttonPanel, BorderLayout.WEST);
        bottomPanel.add(resultLabel, BorderLayout.EAST);
        frame.add(bottomPanel, BorderLayout.SOUTH);

        // Word count logic
        Runnable updateWordCount = () -> {
            String text = textArea.getText().trim();
            int wordCount = 0;
            if (!text.isEmpty()) {
                wordCount = text.split("\\s+").length;
            }
            resultLabel.setText("Word Count: " + wordCount);
        };

        // Button actions
        countButton.addActionListener(e -> updateWordCount.run());
        openButton.addActionListener(e -> {
            JFileChooser fileChooser = new JFileChooser();
            int option = fileChooser.showOpenDialog(frame);
            if (option == JFileChooser.APPROVE_OPTION) {
                File file = fileChooser.getSelectedFile();
                try (BufferedReader reader = new BufferedReader(new FileReader(file))) {
                    StringBuilder sb = new StringBuilder();
                    String line;
                    while ((line = reader.readLine()) != null) {
                        sb.append(line).append("\n");
                    }
                    textArea.setText(sb.toString());
                    updateWordCount.run();
                } catch (IOException ex) {
                    JOptionPane.showMessageDialog(frame, "Error reading file: " + ex.getMessage(), "Error", JOptionPane.ERROR_MESSAGE);
                }
            }
        });

        // Update word count as user types
        textArea.addKeyListener(new KeyAdapter() {
            public void keyReleased(KeyEvent e) {
                updateWordCount.run();
            }
        });

        frame.getContentPane().setBackground(Color.WHITE);
        frame.setVisible(true);
    }
}
